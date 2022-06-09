import { proxy } from "valtio";

type User = {
  from: string;
  setFrom: (val: string) => void;
};

export const user = proxy<User>({
  from: "",
  setFrom(from) {
    user.from = from;
  },
});
