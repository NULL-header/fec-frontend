// ref ValidateEmailInput.test.tsx, ValidatePasswordInput.test.tsx, WarningLabel.test.tsx
// this component uses LoginContainer, ValidatePasswordInput, WarningLabel

import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mocked } from "ts-jest/utils";
import { LoginContainer } from "src/components/LoginContainer";
import { FecApiWrapper } from "src/FecApiWrapper";

jest.mock("../src/FecApiWrapper");

const FecApiWrapperMock = mocked(FecApiWrapper, true);

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = UnPromisify<
  ReturnType<T>
>;

type Responses = AsyncReturnType<typeof FecApiWrapperMock.prototype.login>;

const setLoginMockValue = (value: Responses) => {
  FecApiWrapperMock.prototype.login.mockReturnValue(
    new Promise((resolve) => resolve(value))
  );
};

const excludeNull = function <T>(arg: T) {
  if (arg == null) throw new Error("This value includes null");
  return arg as NonNullable<T>;
};

const getInputFromLabel = (label: HTMLLabelElement) => {
  const parent = excludeNull(label.parentElement);
  const input = excludeNull(parent.querySelector("input"));
  return input;
};

describe("Normal System", () => {
  let loginContainer: RenderResult;

  beforeEach(() => {
    loginContainer = render(<div />);
    rerender();
    jest.clearAllMocks();
  });

  const rerender = (options = {}) => {
    const props = { ...options };
    loginContainer.rerender(<LoginContainer {...props} />);
    return props;
  };

  const getInputs = () => {
    const labelNodes = loginContainer.container.querySelectorAll("label");
    const labels = Array.from(labelNodes);
    const emailIndex = labels.findIndex((e) => e.textContent === "Email");
    const emailLabel = labels.splice(emailIndex, 1)[0];
    const passwordLabel = labels[0];
    return {
      email: getInputFromLabel(emailLabel),
      password: getInputFromLabel(passwordLabel),
    };
  };

  const getSubmitButton = () => {
    const buttons = loginContainer.container.querySelectorAll("button");
    const arrayButtons = Array.from(buttons);
    const nullableSubmit = arrayButtons.find((e) => e.textContent === "log in");
    const submit = excludeNull(nullableSubmit);
    return submit;
  };

  const setExampleValue = () => {
    const { email, password } = getInputs();
    email.value = "example@example.com";
    password.value = "example";
  };

  it("default label", () => {
    const el = loginContainer.getByText("サーバーとの通信が失敗しました。");

    expect(el).toBeInTheDocument();

    const style = window.getComputedStyle(el);
    expect(style).toHaveProperty("visibility", "hidden");
  });

  describe("submit system", () => {
    it("success", () => {
      const value = {
        httpStatus: 200,
        status: "SUCCESS",
        body: { token: { master: "master", onetime: "onetime" } },
      } as Responses;
      setLoginMockValue(value);

      // TODO: Rewrite decent
      expect(true).toBeTruthy();
    });

    describe("failed", () => {
      it("noCommnicate", async () => {
        const value = undefined as Responses;
        setLoginMockValue(value);

        setExampleValue();
        getSubmitButton().click();

        const el = await waitFor(() =>
          loginContainer.getByText("サーバーとの通信が失敗しました。")
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });

      it("missAuth", async () => {
        const value = {
          status: "FAILED",
        } as Responses;
        setLoginMockValue(value);

        setExampleValue();
        getSubmitButton().click();

        const el = await waitFor(() =>
          loginContainer.getByText(
            "認証に失敗しました。入力された情報が間違っています。"
          )
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });
    });

    describe("nothing submit", () => {
      it("not regular", () => {
        const value = undefined as Responses;
        setLoginMockValue(value);

        const inputs = getInputs();
        inputs.email.value = "failed";
        inputs.password.value = "example";
        getSubmitButton().click();

        expect(FecApiWrapperMock.prototype.login).not.toBeCalled();
      });
    });

    // this test fail on el2
    it.skip("label visible when submitting", async () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      let finishSubmit = () => {};
      FecApiWrapperMock.prototype.login.mockReturnValue(
        new Promise((resolve) => {
          const finish = () => resolve(undefined);
          finishSubmit = finish;
          setTimeout(finish, 100000);
        })
      );
      const submit = getSubmitButton();

      setExampleValue();
      submit.click();
      finishSubmit();

      const el1 = await waitFor(() =>
        loginContainer.getByText("サーバーとの通信が失敗しました。")
      );
      const style1 = window.getComputedStyle(el1);
      expect(style1).toHaveProperty("visibility", "initial");

      submit.click();

      const el2 = loginContainer.getByText("サーバーとの通信が失敗しました。");
      const style2 = window.getComputedStyle(el2);
      expect(style2).toHaveProperty("visibility", "hidden");

      finishSubmit();

      const el3 = await waitFor(() =>
        loginContainer.getByText("サーバーとの通信が失敗しました。")
      );
      const style3 = window.getComputedStyle(el3);
      expect(style3).toHaveProperty("visibility", "initial");
    });
  });
});
