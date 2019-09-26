// Shift keycode
const KEY_CODE_SHIFT = 16;

// For highliting
let start = -1;
let end = -1;

// All the inbox items from the inbox container
const InboxItems = [...document.querySelectorAll(".item")];

let shiftHeld = false;

InboxItems.forEach(item => {
  let checkbox = item.children[0];
  checkbox.addEventListener("click", markEmail);
});

function markEmail(e) {
  let index = getItemIndex(this);
  if (shiftHeld && start === -1) {
    start = index;
  } else if (shiftHeld && start !== -1) {
    end = index;
  }

  let email = this.nextElementSibling;
  if (start === -1 || end === -1) {
    if (this.checked) {
      email.style.textDecoration = "line-through";
    } else {
      email.style.textDecoration = "none";
    }
  } else {
    markRange(start, end);
  }
}

function markRange(startInbox, endInbox) {
  [startInbox, endInbox] = [...arguments].sort((a, b) => a - b);
  let checkbox;
  let label;
  for (let i = startInbox; i <= endInbox; i++) {
    checkbox = InboxItems[i].children[0];
    label = InboxItems[i].children[1];
    label.style.textDecoration = "line-through";
    checkbox.checked = true;
  }
  resetRangeIndicies();
}

function resetRangeIndicies() {
  start = -1;
  end = -1;
}

function getItemIndex(checkboxElement) {
  return InboxItems.indexOf(checkboxElement.parentNode);
}

window.addEventListener("keydown", e => {
  shiftHeld = e.keyCode === KEY_CODE_SHIFT;
});

window.addEventListener("keyup", e => {
  if (e.keyCode === KEY_CODE_SHIFT) {
    shiftHeld = false;
    start = -1;
  }
});
