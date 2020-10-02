// ref BaseForm.test.tsx, FormLabel.test.tsx, FormInput.test.tsx, TextField.test.tsx

import React from "react";
import { mocked } from "ts-jest/utils";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CreateContainer } from "src/components";
import { excludeNull } from "src/util";
import { getElementsFrom, renderDomFactory } from "src/util/test/dom";

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

type Responses = AsyncReturnType<typeof FecApiWrapperMock.prototype.createUser>;

const setCreateUserMockValue = (value: Responses) => {
  FecApiWrapperMock.prototype.createUser.mockReturnValue(
    new Promise((resolve) => resolve(value))
  );
};

const getProps = () => ({
  className: "testcase",
});

const renderDom = renderDomFactory(
  <CreateContainer {...getProps()} />,
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

  const submit = () => getButton().click();

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
      name: inputs[1],
      password: inputs[2],
    };
  };

  const setExampleValue = () => {
    const { email, name, password } = getInputs();
    email.value = "example@example.com";
    password.value = "example";
    name.value = "example";
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
        console.log(
          Array.from(
            getElementsFrom(container).byTagName("form").asSingle().children
          ).find((e) => e.tagName === "JET")?.innerHTML
        );
        getButton().click();
        expect(screen.getAllByText("入力欄が空です")).toHaveLength(3);
      });

      it("not formatted", () => {
        const { email, name } = getInputs();
        email.value = "example";
        name.value = "exam#ple";

        submit();

        expect(screen.getByText("不正な形式です")).toBeInTheDocument();
        expect(
          screen.getByText("ハイフン以外の特殊記号を使用しています")
        ).toBeInTheDocument();
      });

      it("too short", () => {
        const { password } = getInputs();
        password.value = "exam";

        getButton().click();

        expect(screen.getByText("パスワードが短すぎます")).toBeInTheDocument();
      });
    });

    it("success", () => {
      const value = {
        httpStatus: 200,
        status: "SUCCESS",
        body: {
          message: "testcase",
        },
      } as Responses;
      setCreateUserMockValue(value);

      // TODO: write success patten test
      expect(true).toBeTruthy();
    });

    describe("failed", () => {
      it("noCommnicate", async () => {
        const value = undefined as Responses;
        setCreateUserMockValue(value);

        setExampleValue();
        submit();

        const el = await waitFor(() =>
          screen.getByText("サーバーとの通信が失敗しました。")
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
        submit();

        const el = await waitFor(() =>
          screen.getByText("入力されたメールアドレスはすでに使用されています。")
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
        submit();

        const el = await waitFor(() =>
          screen.getByText("入力された名前はすでに使用されています。")
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
        submit();

        const el = await waitFor(() =>
          screen.getByText("未知のエラーが発生しました。")
        );
        expect(el).toBeInTheDocument();

        const style = window.getComputedStyle(el);
        expect(style).toHaveProperty("visibility", "initial");
      });
    });
  });
});
