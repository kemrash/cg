import { test, expect, describe, beforeEach, vi } from "vitest";
import type { Mock } from "vitest";
import type { Vm } from "~/types/Type";
import { mount } from "@vue/test-utils";
import RegistrationUser from "../RegistrationUser.vue";
import { registration } from "~/api/User";

vi.mock("~/api/User");

let wrapper: ReturnType<typeof mount>;
let vm: Vm;

beforeEach(() => {
  wrapper = mount(RegistrationUser);

  vm = wrapper.vm as unknown as Vm;
});

describe("RegistrationUser.vue", () => {
  test("Renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("Форма регистрации");
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

  test("Validates name correctly", async () => {
    const nameInput = wrapper.find('input[name="name"]');

    await nameInput.setValue("  Вадим");
    expect(vm.labels.name.error).toBeTruthy();

    await nameInput.setValue("  Вадим  Палыч");
    expect(vm.labels.name.error).toBeTruthy();

    await nameInput.setValue("Vadim");
    expect(vm.labels.name.error).toBeTruthy();

    await nameInput.setValue("@Вадим");
    expect(vm.labels.name.error).toBeTruthy();

    await nameInput.setValue("Вадим");
    expect(vm.labels.name.error).toBe("");
  });

  test("Validates surname correctly", async () => {
    const surNameInput = wrapper.find('input[name="surname"]');

    await surNameInput.setValue("  Петрович");
    expect(vm.labels.surname.error).toBeTruthy();

    await surNameInput.setValue("  Петрович  Палыч");
    expect(vm.labels.surname.error).toBeTruthy();

    await surNameInput.setValue("Petrovich");
    expect(vm.labels.surname.error).toBeTruthy();

    await surNameInput.setValue("@Петрович");
    expect(vm.labels.surname.error).toBeTruthy();

    await surNameInput.setValue("Петрович");
    expect(vm.labels.surname.error).toBe("");
  });

  test("Validates password and passwordSecond correctly", async () => {
    const passwordInput = wrapper.find('input[name="password"]');
    const passwordSecond = wrapper.find('input[name="passwordSecond"]');

    await passwordInput.setValue("short");
    expect(vm.labels.password.error).toBeTruthy();

    await passwordSecond.setValue("short");
    expect(vm.labels.passwordSecond.error).toBeTruthy();

    await passwordInput.setValue("validpassword");
    await passwordSecond.setValue("invalidpassword");
    expect(vm.labels.password.error).toBeTruthy();
    expect(vm.labels.passwordSecond.error).toBeTruthy();

    await passwordInput.setValue("validpassword");
    await passwordSecond.setValue("validpassword");
    expect(vm.labels.password.error).toBe("");
    expect(vm.labels.passwordSecond.error).toBe("");
  });

  test("Registration user", async () => {
    vm.labels.email.value = "2@2.2";
    vm.labels.name.value = "Вадим";
    vm.labels.surname.value = "Петрович";
    vm.labels.password.value = "654321";
    vm.labels.passwordSecond.value = "654321";

    (registration as Mock).mockReturnValue({ success: "success" });

    await vm.onSubmit();
    expect(wrapper.emitted("success")).toBeTruthy();

    (registration as Mock).mockReturnValue({});

    await vm.onSubmit();
    expect(wrapper.emitted("error")).toBeTruthy();

    (registration as Mock).mockReturnValue({ error: "error" });

    await vm.onSubmit();
    expect(vm.labels.email.serverError).toBeTruthy();
  });
});
