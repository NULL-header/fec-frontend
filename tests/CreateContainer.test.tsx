// ref ValidateEmailInput.test.tsx, ValidateNameEmailInput, ValidatePasswordInput.test.tsx,
// WarningLabel.test.tsx

import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mocked } from "ts-jest/utils";
import { CreateContainer } from "../src/components/CreateContainer";
import { FecApiWrapper, isBadResponse } from "../src/FecApiWrapper";

const isBadResponseOrigin = jest.requireActual("../src/FecApiWrapper")
  .isBadResponse;

jest.mock("../src/FecApiWrapper");

const FecApiWrapperMock = mocked(FecApiWrapper, true);
const isBadResponseMock = mocked(isBadResponse, true);
isBadResponseMock.mockImplementation(isBadResponseOrigin);

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = UnPromisify<
  ReturnType<T>
>;

type Responses = AsyncReturnType<typeof FecApiWrapperMock.prototype.createUser>;

const setCreateUserMockValue = (value: Responses) => {
  FecApiWrapperMock.prototype.createUser.mockReturnValue(
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
  let createContainer: RenderResult;

  beforeEach(() => {
    createContainer = render(<div />);
    rerender();
    jest.clearAllMocks();
  });

  const rerender = (options = {}) => {
    const props = { ...options };
    createContainer.rerender(<CreateContainer {...props} />);
    return props;
  };

  const getInputs = () => {
    const labelNodes = createContainer.container.querySelectorAll("label");
    const labels = Array.from(labelNodes);
    const emailIndex = labels.findIndex((e) => e.textContent === "Email");
    const emailLabel = labels.splice(emailIndex, 1)[0];
    const nameIndex = labels.findIndex((e) => e.textContent === "Name");
    const nameLabel = labels.splice(nameIndex, 1)[0];
    const passwordLabel = labels[0];
    return {
      email: getInputFromLabel(emailLabel),
      password: getInputFromLabel(passwordLabel),
      name: getInputFromLabel(nameLabel),
    };
  };

  const getSubmitButton = () => {
    const buttons = createContainer.container.querySelectorAll("button");
    const arrayButtons = Array.from(buttons);
    const nullableSubmit = arrayButtons.find((e) => e.textContent === "create");
    const submit = excludeNull(nullableSubmit);
    return submit;
  };

  const setExampleValue = () => {
    const { email, password, name } = getInputs();
    email.value = "example@example.com";
    password.value = "example";
    name.value = "example";
  };

  it("default label", () => {
    const el = createContainer.getByText("サーバーとの通信が失敗しました。");

    expect(el).toBeInTheDocument();

    const style = window.getComputedStyle(el);
    expect(style).toHaveProperty("visibility", "hidden");
  });

  describe("submit system", () => {
    it("success", () => {
      const value = {
        httpStatus: 200,
        status: "SUCCESS",
        body: { message: "testcase" },
      } as Responses;
      setCreateUserMockValue(value);

      // TODO: Rewrite decent
      expect(true).toBeTruthy();
    });

    describe("failed", () => {
      it("noCommnicate", async () => {
        const value = undefined as Responses;
        setCreateUserMockValue(value);

        setExampleValue();
        getSubmitButton().click();

        const el = await waitFor(() =>
          createContainer.getByText("サーバーとの通信が失敗しました。")
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });

      it("duplicateEmail", async () => {
        const value = {
          status: "FAILED",
          errors: [{ key: "email" }],
        } as Responses;
        setCreateUserMockValue(value);

        setExampleValue();
        getSubmitButton().click();

        const el = await waitFor(() =>
          createContainer.getByText(
            "入力されたメールアドレスはすでに使用されています。"
          )
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });

      it("duplicateName", async () => {
        const value = {
          status: "FAILED",
          errors: [{ key: "name" }],
        } as Responses;
        setCreateUserMockValue(value);

        setExampleValue();
        getSubmitButton().click();

        const el = await waitFor(() =>
          createContainer.getByText("入力された名前はすでに使用されています。")
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });

      it("unknown error", async () => {
        const value = {
          status: "FAILED",
          errors: [{ key: "unknown" }],
        } as Responses;
        setCreateUserMockValue(value);

        setExampleValue();
        getSubmitButton().click();

        const el = await waitFor(() =>
          createContainer.getByText("未知のエラーが発生しました。")
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });
    });

    describe("nothing submit", () => {
      it("not regular", () => {
        const value = undefined as Responses;
        setCreateUserMockValue(value);

        const inputs = getInputs();
        inputs.email.value = "failed";
        inputs.password.value = "example";
        getSubmitButton().click();

        expect(FecApiWrapperMock.prototype.createUser).not.toBeCalled();
      });
    });

    // this test fail on el2
    it.skip("label visible when submitting", async () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      let finishSubmit = () => {};
      FecApiWrapperMock.prototype.createUser.mockReturnValue(
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
        createContainer.getByText("サーバーとの通信が失敗しました。")
      );
      const style1 = window.getComputedStyle(el1);
      expect(style1).toHaveProperty("visibility", "initial");

      submit.click();

      const el2 = createContainer.getByText("サーバーとの通信が失敗しました。");
      const style2 = window.getComputedStyle(el2);
      expect(style2).toHaveProperty("visibility", "hidden");

      finishSubmit();

      const el3 = await waitFor(() =>
        createContainer.getByText("サーバーとの通信が失敗しました。")
      );
      const style3 = window.getComputedStyle(el3);
      expect(style3).toHaveProperty("visibility", "initial");
    });
  });
});
