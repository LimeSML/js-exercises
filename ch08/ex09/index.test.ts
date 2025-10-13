import { withResource } from "./index.ts";

describe("withResource", () => {
  it("should do process and call close finally", () => {
    const resource = {
      called: [] as string[],
      doA() {
        this.called.push("doA");
      },
      doB() {
        this.called.push("doB");
      },
      close() {
        this.called.push("close");
      },
    };
    withResource(resource, (res) => {
      res.doA();
      res.doB();
    });

    expect(resource.called).toEqual(["doA", "doB", "close"]);
  });

  it("should call close when an error occurs", () => {
    const resource = {
      called: [] as string[],
      doA() {
        this.called.push("doA");
        throw new Error("something wrong");
      },
      close() {
        this.called.push("close");
      },
    };
    expect(() => withResource(resource, (res) => res.doA())).toThrow(Error);
    expect(resource.called).toEqual(["doA", "close"]);
  });
});
