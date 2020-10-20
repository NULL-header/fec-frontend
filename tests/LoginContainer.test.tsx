// ref BaseForm.test.tsx, FormLabel.test.tsx, FormInput.test.tsx, TextField.test.tsx

import React from "react";
import { mocked } from "ts-jest/utils";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LoginContainer } from "src/components";
import { excludeNull } from "src/util";
import {
  getElementsFrom,
  renderDomFactory,
} from "@null-header/react-test-util";

import { FecApiWrapper, isBadResponse } from "src/FecApiWrapper";

const isBadResponseOrigin = jest.requireActual("src/FecApiWrapper")
  .isBadResponse;
jest.mock("src/FecApiWrapper");

const FecApiWrapperMock = mocked(FecApiWrapper, true);
const isBadResponseMock = mocked(isBadResponse, true);
isBadResponseMock.mockImplementation(isBadResponseOrigin);

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = UnPromisify<
  ReturnType<T>
>;

type Responses = AsyncReturnType<typeof FecApiWrapperMock.prototype.login>;

const setloginMockValue = (value: Responses) => {
  FecApiWrapperMock.prototype.login.mockReturnValue(
    new Promise((resolve) => resolve(value))
  );
};

const getProps = () => ({
  className: "testcase",
});

const renderDom = renderDomFactory(
  <LoginContainer {...getProps()} />,
  getProps
);

describe("Normal system", () => {
  let result: ReturnType<typeof renderDom>;
  let container: typeof result.container;

  beforeEach(() => {
    result = renderDom();
    container = result.container;
  });

  const getButton = () => {
    const form = getElementsFrom(container).byTagName("form").asSingle();
    const button = Array.from(form.children).find(
      (e) => e.tagName === "BUTTON"
    ) as HTMLButtonElement;
    return excludeNull(button);
  };

  const getInputs = () => {
    const form = getElementsFrom(container).byTagName("form").asSingle();
    const elements = Array.from(form.children);
    const inputs = elements.slice(1, elements.length - 1).map((e) =>
      getElementsFrom(e as HTMLElement)
        .byTagName("input")
        .asSingle()
    ) as HTMLInputElement[];
    return {
      email: inputs[0],
      password: inputs[1],
    };
  };

  const submit = () => getButton().click();

  const setExampleValue = () => {
    const { email, password } = getInputs();
    email.value = "example@example.com";
    password.value = "example";
  };

  it("default label", () => {
    const el = screen.getByText("サーバーとの通信が失敗しました。");
    expect(el).toBeInTheDocument();

    const style = window.getComputedStyle(el);
    expect(style).toHaveProperty("visibility", "hidden");
  });

  describe("submit system", () => {
    describe("nothing submit", () => {
      it("blank", () => {
        submit();
        expect(screen.getAllByText("入力欄が空です")).toHaveLength(2);
      });

      it("not formated", async () => {
        const { email } = getInputs();
        email.value = "example";

        submit();

        expect(screen.getByText("不正な形式です")).toBeInTheDocument();
      });

      it("too short", () => {
        const { password } = getInputs();
        password.value = "exam";

        submit();

        expect(screen.getByText("パスワードが短すぎます")).toBeInTheDocument();
      });
    });

    it("success", () => {
      const value = {
        httpStatus: 200,
        status: "SUCCESS",
        body: {
          token: { master: "master", onetime: "onetime" },
        },
      } as Responses;
      setloginMockValue(value);

      // TODO: write success patten test
      expect(true).toBeTruthy();
    });

    describe("failed", () => {
      it("noCommnicate", async () => {
        const value = undefined as Responses;
        setloginMockValue(value);

        setExampleValue();
        submit();

        const el = await waitFor(() =>
          screen.getByText("サーバーとの通信が失敗しました。")
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });

      it("missAuth", async () => {
        const value = {
          status: "FAILED",
        } as Responses;
        setloginMockValue(value);

        setExampleValue();
        submit();

        const el = await waitFor(() =>
          screen.getByText(
            "認証に失敗しました。入力された情報が間違っています。"
          )
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });
    });
  });
});
