// __tests__/crimeFlow.test.js - Expo Router User Flow Test
import {
    renderRouter,
    screen,
    userEvent,
    waitFor,
} from "expo-router/testing-library";

import RootLayout from "../app/_layout";
import DetailPage from "../app/detail";
import Index from "../app/index";

describe("create new crime", () => {
  beforeEach(() => {
    // Clear any existing data before each test
    jest.clearAllMocks();
  });

  it("Creates a new crime", async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      renderRouter(
        {
          _layout: () => <RootLayout />,
          index: () => <Index />,
          detail: () => <DetailPage />,
        },
        {
          initialUrl: "/",
        }
      );
    });

    // Find and press the add crime button
    const addCrimeButton = await screen.findByTestId("add-crime-button");
    await user.press(addCrimeButton);

    // Verify we navigated to the detail page
    expect(screen).toHavePathname("/detail");

    // Find form elements
    const titleInput = await screen.findByPlaceholderText("Title");
    const detailsInput = await screen.findByPlaceholderText("What happened?");
    const saveButton = await screen.findByText("Save");

    // Fill out the form
    await user.type(titleInput, "Test Crime");
    await user.type(detailsInput, "This is a test crime.");
    
    // Press save button
    await user.press(saveButton);

    // Verify success message appears
    await waitFor(() => {
      expect(screen.getByText("Crime saved successfully!")).toBeTruthy();
    });
  });

  it("Navigates from index to detail and back", async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      renderRouter(
        {
          _layout: () => <RootLayout />,
          index: () => <Index />,
          detail: () => <DetailPage />,
        },
        {
          initialUrl: "/",
        }
      );
    });

    // Should start at index
    expect(screen).toHavePathname("/");

    // Navigate to detail
    const addCrimeButton = await screen.findByTestId("add-crime-button");
    await user.press(addCrimeButton);

    // Should be at detail
    expect(screen).toHavePathname("/detail");

    // Verify detail screen elements are present
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Title")).toBeTruthy();
      expect(screen.getByPlaceholderText("What happened?")).toBeTruthy();
      expect(screen.getByText("Save")).toBeTruthy();
    });
  });

  it("Validates form input", async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      renderRouter(
        {
          _layout: () => <RootLayout />,
          index: () => <Index />,
          detail: () => <DetailPage />,
        },
        {
          initialUrl: "/detail",
        }
      );
    });

    // Try to save without entering a title
    const saveButton = await screen.findByText("Save");
    await user.press(saveButton);

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText("Please enter a title for the crime")).toBeTruthy();
    });

    // Verify we're still on detail page
    expect(screen).toHavePathname("/detail");
  });
});