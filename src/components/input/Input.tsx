import React from "react";

type Props = {
    label: string
}

const Input = (props: Props) => {
    return <input placeholder={props.label} />
};

export default Input;