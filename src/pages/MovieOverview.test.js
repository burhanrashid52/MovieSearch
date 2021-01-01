import {render, fireEvent, waitForDomChange} from '@testing-library/react';
import Home from "./Home";
import React from "react";
import MovieOverview from "./MovieOverview";

jest.mock('../api');

it('should movie overview title', async () => {
    const {queryByText} = render(<MovieOverview/>)

    expect(queryByText('Loading...')).toBeNull();
})