import { test, expect, describe, beforeEach, vi } from "vitest";
import type { Mock } from "vitest";
import type { Vm } from "~/types/Type";
import { mount } from "@vue/test-utils";
import LoginUserComponent from "../LoginUser.vue";
import { login } from "~/api/User";
import { useUserStore } from "~/stores/User";

vi.mock("~/api/User");
vi.mock("~/stores/User");

(useUserStore as unknown as Mock).mockReturnValue({
  getUser: async () => {},
});

let wrapper: ReturnType<typeof mount>;
let vm: Vm;

beforeEach(() => {
  wrapper = mount(LoginUserComponent);

  vm = wrapper.vm as unknown as Vm;
});

describe("LoginUser.vue", () => {
  test("Renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("Форма входа");
  });

  test("Validates email correctly", async () => {
    const emailInput = wrapper.find('input[name="email"]');

    await emailInput.setValue("invalid-email@");
    expect(vm.labels.email.error).toBeTruthy();

    await emailInput.setValue("@invalid-email.ru");
    expect(vm.labels.email.error).toBeTruthy();

    await emailInput.setValue("invalid@email");
    expect(vm.labels.email.error).toBeTruthy();

    await emailInput.setValue("invalid-email@.ru");
    expect(vm.labels.email.error).toBeTruthy();

    await emailInput.setValue("valid.email@example.com");
    expect(vm.labels.email.error).toBe("");
  });

  test("Validates password correctly", async () => {
    const passwordInput = wrapper.find('input[name="password"]');

    await passwordInput.setValue("short");
    expect(vm.labels.password.error).toBeTruthy();

    await passwordInput.setValue("validpassword");
    expect(vm.labels.password.error).toBe("");
  });

  test("Logins user", async () => {
    vm.labels.email.value = "2@2.2";
    vm.labels.password.value = "654321";

    (login as Mock).mockReturnValue({ result: "success" });

    await vm.onSubmit();

    expect(wrapper.emitted("closeModal")).toBeTruthy();

    (login as Mock).mockReturnValue({});

    await vm.onSubmit();

    expect(wrapper.emitted("error")).toBeTruthy();
  });
});
