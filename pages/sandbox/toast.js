import React from "react";
import ReactDOM from "react-dom";
import MyLayout from "../../components/layout";

import { ToastProvider, useToasts } from '../../providers/Toast';

function Demo() {
  const { add } = useToasts();
  return <button onClick={() => add("Click to dismiss!")}>Add toast</button>;
}

function Toast() {
  return (
    <MyLayout>
      <ToastProvider>
        <h1>Context/State Hooks</h1>
        <p>Refactoring a class based implementation.</p>
        <p>
          <Demo />
        </p>
      </ToastProvider>
    </MyLayout>
  );
}

export default Toast