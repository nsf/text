import { IconType } from "components/Icon";
import { autorun, makeAutoObservable, observable, toJS } from "mobx";

type PageModeIndex = { kind: "index" };
type PageModeSettings = { kind: "settings" };
type PageModeAbout = { kind: "about" };
type PageModeShow = { kind: "show"; itemIndex: number };
type PageModeNewItem = { kind: "form" };

type PageMode = PageModeIndex | PageModeAbout | PageModeSettings | PageModeShow | PageModeNewItem;

export class ItemForm {
  title = "";
  text = "";
  qrCode = "";
  icon: IconType = "default";
  index = -1;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  clear() {
    this.title = "";
    this.text = "";
    this.qrCode = "";
    this.icon = "default";
    this.index = -1;
  }

  editItem(item: Item, index: number) {
    this.title = item.title;
    this.text = item.text;
    this.qrCode = item.qrCode || "";
    this.icon = item.icon || "default";
    this.index = index;
  }

  setTitle(v: string) {
    this.title = v;
  }
  setText(v: string) {
    this.text = v;
  }
  setQRCode(v: string) {
    this.qrCode = v;
  }
  setIcon(v: IconType) {
    this.icon = v;
  }

  get isValid() {
    return this.title !== "" && this.text !== "";
  }
}

export interface Item {
  title: string;
  text: string;
  qrCode?: string;
  icon?: IconType;
}

export interface StateJSON {
  darkMode: boolean;
  animation: boolean;
  showTips?: boolean;
  items: Item[];
}

class State {
  pageMode: PageMode = { kind: "index" };
  darkMode = false;
  animation = true;
  showTips = true;
  items: Item[] = [
    { icon: "email", title: "Email", text: "no.smile.face@gmail.com" },
    { icon: "phone", title: "Phone", text: "+7 999 123-12-34" },
    { icon: "default", title: "Telegram", text: "@nosmileface", qrCode: "https://tg.me/nosmileface" },
  ];
  form = new ItemForm();

  constructor() {
    makeAutoObservable(
      this,
      {
        pageMode: observable.ref,
      },
      { autoBind: true }
    );
  }

  deleteItem() {
    const idx = this.form.index;
    if (idx !== -1) {
      this.items.splice(idx, 1);
    }
  }

  finalizeItem() {
    const idx = this.form.index;
    const item: Item = {
      title: this.form.title,
      text: this.form.text,
      qrCode: this.form.qrCode,
      icon: this.form.icon,
    };
    let itemIndex = -1;
    if (idx !== -1) {
      this.items[idx] = item;
      itemIndex = idx;
    } else {
      this.items.push(item);
      this.items.sort((a, b) => a.title.localeCompare(b.title));
      itemIndex = this.items.findIndex((v) => v.title === item.title);
    }
    return itemIndex;
  }

  setPageMode(pm: PageMode) {
    this.pageMode = pm;
  }

  setDarkMode(v: boolean) {
    this.darkMode = v;
  }

  setAnimation(v: boolean) {
    this.animation = v;
  }

  setShowTips(v: boolean) {
    this.showTips = v;
  }
}

function initState(state: State): State {
  try {
    const obj = JSON.parse(localStorage.getItem("appState") || "") as StateJSON;
    state.darkMode = obj.darkMode;
    state.animation = obj.animation;
    state.showTips = obj.showTips ?? true;
    state.items = obj.items;
  } catch {
    // do nothing
  }

  autorun(() => {
    const obj: StateJSON = {
      darkMode: state.darkMode,
      animation: state.animation,
      showTips: state.showTips,
      items: toJS(state.items),
    };
    try {
      localStorage.setItem("appState", JSON.stringify(obj));
    } catch {
      // do nothing
    }
  });

  return state;
}

export const state = initState(new State());
