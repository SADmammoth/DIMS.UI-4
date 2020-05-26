import InputMask from '../InputMask/InputMask';

export default function MaskedInput(mask, byCharValidator, maskType, input) {
  if (mask && mask !== '') {
    return InputMask(input, mask, !byCharValidator, maskType);
  }
  return input;
}
