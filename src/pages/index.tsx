import "styles/all.css";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import map from "lodash/map";
import QRCode from "qrcode.react";

import { BackIcon } from "components/icons/BackIcon";
import { useSwipeable } from "react-swipeable";
import { PlusIcon } from "components/icons/PlusIcon";
import { SettingsIcon } from "components/icons/SettingsIcon";
import { InfoIcon } from "components/icons/InfoIcon";
import { Item, state } from "state";
import { Toggle } from "components/Toggle";
import { TextInput } from "components/TextInput";
import { CancelIcon } from "components/icons/CancelIcon";
import { ApplyIcon } from "components/icons/ApplyIcon";
import { transaction } from "mobx";
import { EditIcon } from "components/icons/EditIcon";
import { DeleteIcon } from "components/icons/DeleteIcon";
import { BulbIcon } from "components/icons/BulbIcon";
import { ForwardIcon } from "components/icons/ForwardIcon";
import { IconPicker } from "components/IconPicker";
import { Icon } from "components/Icon";

function useSwipeBackToIndex() {
  return useSwipeable({
    onSwipedRight: () => {
      state.setPageMode({ kind: "index" });
    },
  });
}

interface FormMenuProps {
  edit: boolean;
}

const FormMenu = observer((props: FormMenuProps) => (
  <div className="flex bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 space-x-4 px-4 py-3">
    <button
      type="button"
      onClick={() => {
        state.setPageMode({ kind: "index" });
      }}
    >
      <CancelIcon size={32} />
    </button>
    {props.edit ? (
      <button
        type="button"
        onClick={() => {
          transaction(() => {
            state.deleteItem();
            state.setPageMode({ kind: "index" });
          });
        }}
      >
        <DeleteIcon size={32} />
      </button>
    ) : null}
    <div className="flex-grow" />
    {state.form.isValid ? (
      <button
        type="button"
        onClick={() => {
          transaction(() => {
            const itemIndex = state.finalizeItem();
            state.setPageMode({ kind: "show", itemIndex });
          });
        }}
      >
        <ApplyIcon size={32} />
      </button>
    ) : null}
  </div>
));

const BackToIndexMenu = () => (
  <div className="flex flex-row-reverse bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 space-x-4 px-4 py-3">
    <button
      type="button"
      onClick={() => {
        state.setPageMode({ kind: "index" });
      }}
    >
      <BackIcon size={32} />
    </button>
  </div>
);

const IndexMenu = () => (
  <div className="flex bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 space-x-4 px-4 py-3">
    <button
      type="button"
      onClick={() => {
        state.setPageMode({ kind: "settings" });
      }}
    >
      <SettingsIcon size={32} />
    </button>
    <button
      type="button"
      onClick={() => {
        state.setPageMode({ kind: "about" });
      }}
    >
      <InfoIcon size={32} />
    </button>
    <div className="flex-grow" />
    <button
      type="button"
      onClick={() => {
        transaction(() => {
          state.form.clear();
          state.setPageMode({ kind: "form" });
        });
      }}
    >
      <PlusIcon size={32} />
    </button>
  </div>
);

const SettingsPage = observer(() => {
  const handlers = useSwipeBackToIndex();
  return (
    <div className="app-page px-4 py-6 space-y-4" {...handlers}>
      <Toggle value={state.darkMode} onChange={state.setDarkMode} label="Dark mode" />
      <Toggle value={state.animation} onChange={state.setAnimation} label="Animation" />
      <Toggle value={state.showTips} onChange={state.setShowTips} label="Show tips & tricks" />
    </div>
  );
});

const AboutPage = () => {
  const handlers = useSwipeBackToIndex();
  return (
    <div className="app-page flex flex-col flex-grow p-2 py-5" {...handlers}>
      <div className="text-3xl text-center font-bold mb-2">Text</div>
      <div className="text-center flex-grow">
        Sometimes you need to show some text to another person. It might be a mobile phone number, how to spell your
        name or perhaps, an email address. This app lets you configure text snippets and display them in a readable
        fashion.
      </div>
      <div className="text-sm text-center mt-5">
        Made by{" "}
        <a className="text-blue-500" href="https://nosmileface.dev">
          nosmileface
        </a>
      </div>
    </div>
  );
};

const tipsAndTricks = [
  "Swipe right to return to index page.",
  "You can disable tips & tricks widget in settings menu.",
  "Tap on displayed text to reveal additional UI elements.",
];

const TipsAndTricks = () => {
  const [currentItem, setCurrentItem] = useState(0);
  return (
    <div className="p-2 pb-4">
      <div className="bg-yellow-100 border-yellow-300 dark:bg-green-900 border dark:border-green-300 p-2 rounded space-y-3">
        <div className="dark:text-yellow-400 flex justify-between">
          <span className="align-middle font-semibold">
            Tips & tricks ({currentItem + 1}/{tipsAndTricks.length})
          </span>
          <BulbIcon className="inline-block align-middle" size={18} />
        </div>
        <div className="leading-5">{tipsAndTricks[currentItem]}</div>
        <div className="flex justify-center space-x-2">
          <div
            onClick={() => {
              if (currentItem > 0) setCurrentItem(currentItem - 1);
            }}
          >
            <BackIcon size={32} />
          </div>
          <div
            onClick={() => {
              if (currentItem < tipsAndTricks.length - 1) setCurrentItem(currentItem + 1);
            }}
          >
            <ForwardIcon size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexPage = observer(() => (
  <div className="app-page flex flex-col">
    <div className="flex-grow text-lg overflow-y-auto min-h-0 divide-y dark:divide-gray-700">
      {map(state.items, (item, idx) => (
        <div
          key={idx}
          className="flex items-center py-4"
          onClick={() => {
            state.setPageMode({ kind: "show", itemIndex: idx });
          }}
        >
          <div className="flex-shrink-0 px-4">
            <Icon value={item.icon || "default"} />
          </div>
          <div className="flex-grow">{item.title}</div>
        </div>
      ))}
      <div />
    </div>
    {state.showTips ? <TipsAndTricks /> : null}
  </div>
));

interface ShopPageProps {
  item: Item;
  itemIndex: number;
}

const ShowPage = (props: ShopPageProps) => {
  const handlers = useSwipeBackToIndex();
  const PADDING = 20;
  const [sizeInfo, setSizeInfo] = useState({ fontSize: 0, screenWidth: 0 });
  const [showButtons, setShowButtons] = useState(false);
  useEffect(() => {
    const el = document.createElement("div");
    const text = document.createTextNode(props.item.text);
    el.appendChild(text);
    el.className = "font-sans text-base";
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.style.top = "-9999px";
    document.body.appendChild(el);
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    document.body.removeChild(el);
    const maxSize = document.body.offsetWidth / h / 2;
    setSizeInfo({
      fontSize: Math.min(maxSize, (document.body.offsetHeight - PADDING * 2) / w),
      screenWidth: document.body.offsetWidth,
    });
  }, []);
  return (
    <div
      className="app-page h-screen flex items-center justify-around relative px-6"
      {...handlers}
      onClick={() => {
        setShowButtons(true);
      }}
    >
      {props.item.qrCode && sizeInfo.screenWidth ? (
        <div className="border-8 border-white" style={{ maxWidth: "50%" }}>
          <QRCode renderAs="svg" width="100%" height="100%" value={props.item.qrCode} />
        </div>
      ) : null}
      <div style={{ fontSize: `${sizeInfo.fontSize}rem`, writingMode: "vertical-rl" }}>{props.item.text}</div>
      {showButtons ? (
        <div className="absolute bottom-3 right-3">
          <button
            className="block"
            type="button"
            onClick={() => {
              state.setPageMode({ kind: "index" });
            }}
          >
            <BackIcon size={32} />
          </button>
        </div>
      ) : null}
      {showButtons ? (
        <div className="absolute bottom-3 left-3">
          <button
            className="block"
            type="button"
            onClick={() => {
              transaction(() => {
                state.form.editItem(props.item, props.itemIndex);
                state.setPageMode({ kind: "form" });
              });
            }}
          >
            <EditIcon size={32} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

const FormPage = observer(() => {
  const handlers = useSwipeBackToIndex();
  const { form } = state;
  return (
    <div className="app-page flex flex-col" {...handlers}>
      <div className="p-4 space-y-4 flex-grow">
        <TextInput label="Title" value={form.title} onChange={form.setTitle} />
        <TextInput label="Text" value={form.text} onChange={form.setText} />
        <TextInput label="Link (QR code)" value={form.qrCode} onChange={form.setQRCode} />
        <IconPicker label="Icon" value={form.icon} onChange={form.setIcon} />
      </div>
    </div>
  );
});

const Menu = observer(() =>
  state.pageMode.kind === "show" ? null : state.pageMode.kind === "index" ? (
    <IndexMenu />
  ) : state.pageMode.kind === "form" ? (
    <FormMenu edit={state.form.index !== -1} />
  ) : (
    <BackToIndexMenu />
  )
);

const Page = observer(() => {
  const animationEnabled = state.animation;
  const timeout = animationEnabled ? 500 : 0;
  return (
    <TransitionGroup enter={animationEnabled} exit={animationEnabled} component={null}>
      {state.pageMode.kind === "index" ? (
        <CSSTransition timeout={timeout}>
          <IndexPage />
        </CSSTransition>
      ) : null}
      {state.pageMode.kind === "settings" ? (
        <CSSTransition timeout={timeout}>
          <SettingsPage />
        </CSSTransition>
      ) : null}
      {state.pageMode.kind === "about" ? (
        <CSSTransition timeout={timeout}>
          <AboutPage />
        </CSSTransition>
      ) : null}
      {state.pageMode.kind === "show" ? (
        <CSSTransition timeout={timeout}>
          <ShowPage item={state.items[state.pageMode.itemIndex]} itemIndex={state.pageMode.itemIndex} />
        </CSSTransition>
      ) : null}
      {state.pageMode.kind === "form" ? (
        <CSSTransition timeout={timeout}>
          <FormPage />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  );
});

const Index = observer(() => {
  if (typeof window === "undefined") return null;
  return (
    <div
      className={classnames({
        dark: state.darkMode,
        "is-index": state.pageMode.kind === "index",
        animated: state.animation,
      })}
    >
      <div className="h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-gray-100">
        <div className="flex-grow relative overflow-hidden app-page-container">
          <Page />
        </div>
        <Menu />
      </div>
    </div>
  );
});

export default Index;
