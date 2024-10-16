import { test, expect, describe } from "vitest";
import type { Label } from "~/types/Type";
import { mount } from "@vue/test-utils";
import formWithButton from "../FormWithButton.vue";

const label: Label = {
  type: "email",
  name: "email",
  placeholder: "Электронная почта",
  icon: "string",
  value: "",
  flagActiveValidation: false,
  error: computed(() => ""),
  serverError: "",
};

let wrapper: ReturnType<typeof mount>;

const propsComponent = (
  textBtn: string = "Text",
  isDisabledBtn: boolean = false
) => {
  return {
    props: {
      labels: {
        email: label,
      },
      textBtn: textBtn,
      isDisabledBtn,
    },
  };
};

describe("formWithButton.vue", () => {
  test("Renders correctly", () => {
    wrapper = mount(formWithButton, propsComponent());

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("fieldset").exists()).toBe(true);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("label").exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  test("The text on the button is displayed correctly", () => {
    const text = "Button text";

    wrapper = mount(formWithButton, propsComponent(text));

    const btn = wrapper.find("button");
    expect(btn.text()).toBe(text);
  });

  test("The button correctly disables the dissable attribute", () => {
    wrapper = mount(formWithButton, propsComponent("text", true));
    expect(wrapper.find("button").attributes("disabled")).toBeUndefined();
  });

  test("The button correctly includes the dissable attribute", () => {
    wrapper = mount(formWithButton, propsComponent());
    expect(wrapper.find("button").attributes("disabled")).toBe("");
  });

  test("Submit correctly", async () => {
    wrapper = mount(formWithButton, propsComponent());

    await wrapper.find("form").trigger("submit");
    expect(wrapper.emitted()).toHaveProperty("submit");
  });
});
