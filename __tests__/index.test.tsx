import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../app/components/Header";
import { User } from "@supabase/supabase-js";

const mockGetCurrentUser = jest.fn() as jest.MockedFunction<
  () => Promise<User | null>
>;

describe("Header", () => {
  beforeEach(() => {
    mockGetCurrentUser.mockReset();
  });

  it("renders a heading", async () => {
    mockGetCurrentUser.mockResolvedValue(null);
    render(<Header getCurrentUser={mockGetCurrentUser} />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
