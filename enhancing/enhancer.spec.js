const enhancer = require("./enhancer.js");

const item = { name: "Good Weapon", durability: 100, enhancement: 20 };

describe("Repairing", () => {
  it("should return a new item with durability 100", () => {
    item.durability = 0;
    const newItem = enhancer.repair(item);
    expect(newItem.durability).toBe(100);
    console.log("Repairing - ", enhancer.get(newItem).name);
  });
});

describe("Enhancing", () => {
  it("succeeding should increase enhancement by 1 unless level is 20", () => {
    item.enhancement = 0;
    let newItem = enhancer.success(item);
    expect(newItem.enhancement).toBe(1);
    console.log("Success (under 20) - ", enhancer.get(newItem).name);
    item.enhancement = 20;
    newItem = enhancer.success(item);
    expect(newItem.enhancement).toBe(20);
    console.log("Success (at 20) - ", enhancer.get(newItem).name);
  });

  it("failing should decrease durability by 5 if enhancement is < 15", () => {
    item.enhancement = 0;
    item.durability = 100;
    const newItem = enhancer.fail(item);
    expect(newItem.durability).toBe(95);
    console.log("Failing (0 enhancement) - ", enhancer.get(newItem).name);
  });

  it("failing should decrease durability by 10 if enhancement is >= 15", () => {
    item.enhancement = 15;
    item.durability = 100;
    const newItem = enhancer.fail(item);
    expect(newItem.durability).toBe(90);
    console.log("Failing - ", enhancer.get(newItem).name);
  });

  it("failing should decrease durability by 10 if enhancement is >= 15 AND decrease enhancement by 1 if its > 16", () => {
    item.enhancement = 20;
    item.durability = 100;
    const newItem = enhancer.fail(item);
    expect(newItem.durability).toBe(90);
    expect(newItem.enhancement).toBe(19);
    console.log("Failing - ", enhancer.get(newItem).name);
  });
});
