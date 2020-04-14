export default function toWord(_num) {
  let str = "";
  let multiples = Math.ceil(_num / 26);
  let _charAtCode = _num - (multiples - 1) * 26;
  for (let i = 0; i < multiples; i++)
    str += String.fromCharCode(_charAtCode + 64);
  return str;
}
