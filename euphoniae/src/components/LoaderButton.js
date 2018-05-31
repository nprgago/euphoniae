import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "../scss/LoaderButton.scss";

/* Loader Button Component.
This component takes a 'isLoading' flag and the text displayed
by the button in it two stages (default state and loading state).

Button is disable when 'isloading' flag is true, preventing user 
from clicking while loggin in. */

export default ({
    isLoading,
    text,
    loadingText,
    className = "",
    disabled = false,
    ...props
}) =>
    <Button
        className={`LoaderButton ${className}`}
        disabled={disabled || isLoading}
        {...props}
    >
        {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
        {!isLoading ? text : loadingText}
    </Button>;