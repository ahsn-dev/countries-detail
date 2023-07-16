function ElementGenerator({ element, child, ...rest }) {
  const elem = document.createElement(element);

  for (const key in rest) {
    elem[key] = rest[key];
  }

  Array.isArray(child) ? elem.append(...child) : child && elem.append(child);

  return elem;
}

export default ElementGenerator;
