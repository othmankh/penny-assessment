import { expect, test, type Page } from "@playwright/test";

const startNewGame = async (page: Page) => {
  await page.goto("/");
  await page.getByRole("button", { name: "New Game" }).click();
  await expect(page.getByRole("button", { name: "Bet Higher ↑" })).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
});

test("shows landing page with game details and leaderboard", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Hand Betting Game" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Top 5 Leaderboard" })).toBeVisible();
  await expect(page.getByRole("button", { name: "New Game" })).toBeVisible();
});

test("starts a game and shows the current hand", async ({ page }) => {
  await startNewGame(page);

  await expect(page.getByText("Current Hand")).toBeVisible();
  await expect(page.getByText("Draw")).toBeVisible();
  await expect(page.getByText("Discard")).toBeVisible();
  await expect(page.getByText("History")).toBeVisible();
});

test("records a bet in history after placing higher", async ({ page }) => {
  await startNewGame(page);

  await expect(page.getByText("Previous hands will appear here.")).toBeVisible();
  await page.getByRole("button", { name: "Bet Higher ↑" }).click();

  await expect(page.getByText(/(?:Won|Lost) • higher/)).toBeVisible();
  await expect(page.getByText("Previous hands will appear here.")).not.toBeVisible();
});

test("cancels exit confirmation and keeps the game active", async ({ page }) => {
  await startNewGame(page);
  await page.getByRole("button", { name: "Exit Game" }).first().click();

  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();

  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Bet Higher ↑" })).toBeVisible();
});

test("exits the game after confirmation and returns home", async ({ page }) => {
  await startNewGame(page);
  await page.getByRole("button", { name: "Exit Game" }).first().click();
  await page.getByRole("dialog").getByRole("button", { name: "Exit Game" }).click();

  await expect(page.getByRole("heading", { name: "Hand Betting Game" })).toBeVisible();
  await expect(page.getByRole("button", { name: "New Game" })).toBeVisible();
});
