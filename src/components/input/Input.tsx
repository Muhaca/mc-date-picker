import React from "react";

type Props = {
    label: string
}

const Input = (props: Props) => {
    return <button>{props.label}</button>
};

export default Input;