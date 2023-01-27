import { screen, render } from '@testing-library/react';
import Navigation from "../../Navigation";

import {NAVIGATION_MENU_VALUES} from "../../../constants/Navigation.constants";

describe("Navigation", () => {
    const {container} = render(<Navigation navItems={NAVIGATION_MENU_VALUES} />);
    describe("generate nav links", () => {
        it('should create nav links from config', () => {
            expect(container).toMatchSnapshot();
        });
    });
});