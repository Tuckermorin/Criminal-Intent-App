// __tests__/expoRouterFlow.test.js - User Flow Test with expo-router/testing-library
import {
    renderRouter,
    screen,
    userEvent,
    waitFor,
} from "expo-router/testing-library";

import RootLayout from "../app/_layout";
import DetailPage from "../app/detail";
import Index from "../app/index";

describe("Criminal Intent App User Flow", () => {
  beforeEach(() => {
    // Clear any existing data before each test
    jest.clearAllMocks();
  });

  it("Creates a new crime through complete navigation flow", async () => {
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

    // Should start at the index page
    expect(screen).toHavePathname("/");

    // Find and press the add crime button
    const addCrimeButton = await screen.findByTestId("add-crime-button");
    await user.press(addCrimeButton);

    // Should navigate to detail page
    await waitFor(() => {
      expect(screen).toHavePathname("/detail");
    });

    // Find form elements on detail page
    const titleInput = await screen.findByPlaceholderText("Enter crime title");
    const detailsInput = await screen.findByPlaceholderText("What happened?");
    const saveButton = await screen.findByText("Save");

    // Fill out the crime form
    await user.type(titleInput, "Test Crime");
    await user.type(detailsInput, "This is a test crime description.");
    
    // Press save button
    await user.press(saveButton);

    // Verify success message appears
    await waitFor(() => {
      expect(screen.getByText("Crime saved successfully!")).toBeTruthy();
    });

    // Should still be on detail page initially (before navigation back)
    expect(screen).toHavePathname("/detail");
  });

  it("Navigates from index to detail and validates form input", async () => {
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

    // Navigate to detail page
    const addCrimeButton = await screen.findByTestId("add-crime-button");
    await user.press(addCrimeButton);

    await waitFor(() => {
      expect(screen).toHavePathname("/detail");
    });

    // Try to save without entering a title
    const saveButton = await screen.findByText("Save");
    await user.press(saveButton);

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText("Please enter a title for the crime")).toBeTruthy();
    });

    // Should remain on detail page
    expect(screen).toHavePathname("/detail");
  });

  it("Toggles solved status on crime", async () => {
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

    // Should be on detail page
    expect(screen).toHavePathname("/detail");

    // Find and toggle the solved checkbox
    const solvedCheckbox = await screen.findByText("Solved");
    await user.press(solvedCheckbox);

    // Should show checkmark after toggle
    await waitFor(() => {
      expect(screen.getByText("✓")).toBeTruthy();
    });
  });

  it("Shows empty state on index screen with no crimes", async () => {
    await waitFor(() => {
      renderRouter(
        {
          _layout: () => <RootLayout />,
          index: () => <Index />,
        },
        {
          initialUrl: "/",
        }
      );
    });

    // Should show empty state
    await waitFor(() => {
      expect(screen.getByText("No Crimes Reported")).toBeTruthy();
      expect(screen.getByText("Tap the + button to add your first crime report")).toBeTruthy();
    });
  });
});