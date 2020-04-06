import React from 'react';
import PropTypes from 'prop-types';
import Validator from '../../../helpers/Validator';

function MaskedInput(input, mask, validate = false, type = 'default') {
  let resultInput = input;
  console.log(validate);
  if (input.props.type === 'textarea' || input.props.type === 'select') {
    throw Error('TextArea and SelectInput do not support input mask');
  }
  const maskArray = mask.split(/(a\\(?!\\))|(h\\(?!\\))|(#\\(?!\\))|(9\\(?!\\))|(\\\\)|()/).filter((el) => el);
  if (validate && type === 'invisible') {
    resultInput = React.cloneElement(resultInput, {
      onKeyPress: (e) => {
        if (!Validator.maskByChar(e.target.value + e.key, mask)) {
          e.preventDefault();
        }
      },
    });
  }
  switch (type) {
    case 'invisible':
      return followInvisibleMask(resultInput, maskArray);
    default:
      return followMask(resultInput, maskArray);
  }
}

function followInvisibleMask(input, maskArray) {
  if (!maskArray[input.props.value.length]) {
    return input;
  }
  if ((!input.props.value || input.props.value === '') && !/[9aAh%#](?!(\\)(?!\\))/.test(maskArray[0])) {
    return React.cloneElement(input, {
      onFocus: (event) => {
        const firstPlaceholder = maskArray.findIndex((el) => /[9aAh%#](?!(\\)(?!\\))/.test(el));
        event.target.value = maskArray
          .splice(0, firstPlaceholder)
          .join('')
          .replace(/([9aAh%#])\\(?!\\)/s, '$1');
        event.target.setSelectionRange(firstPlaceholder + 1, firstPlaceholder + 1);
      },
    });
  }
  console.log(maskArray[input.props.value.length]);
  if (!/[9aAh%#](?!(\\)(?!\\))/.test(maskArray[input.props.value.length])) {
    input.props.onInput({
      target: {
        name: input.props.name,
        value: input.props.value + maskArray[input.props.value.length].replace(/([9aAh%#])\\(?!\\)/, '$1'),
      },
    });
    return input;
  }
  return input;
}

function followMask(input, maskArray) {
  if (maskArray[input.props.value.length]) {
    if (!input.props.value || input.props.value === '') {
      return React.cloneElement(input, {
        onClick: (event) => {
          // if (event.button === 'left') {
          const firstPlaceholder = maskArray.findIndex((el) => /[9aAh%#](?!(\\)(?!\\))/.test(el));
          event.target.setSelectionRange(firstPlaceholder, firstPlaceholder);
          // }
        },
        onFocus: (event) => {
          event.target.value = addMask('', maskArray);
        },
        onKeyDown: (event) => {
          console.log(event.key);
          if (event.key === 'Backspace' /*backspace */) {
            const target = event.target;
            let { value } = event.target;
            const start = target.selectionStart - 1;
            const end = target.selectionEnd;
            console.log(target.value.substring(target.selectionStart - 1, target.selectionEnd));
            console.log(value.split('').splice(start, end - start));

            value = value.split('');
            value.splice(
              start,
              end - start,
              target.value.substring(start, end).replace(
                new RegExp(
                  `[^${maskArray
                    .filter((el, i, arr) => !arr.slice(i + 1).includes(el))
                    .join('')
                    .replace(/[9aAh%#](?!(\\)(?!\\))/g, '')
                    .replace(/([9aAh%#])\\(?!\\)/, '$1')}]+`,
                  'g',
                ),
                '_',
              ),
            );
            event.target.value = value.join('');
            event.preventDefault();
            return;
          }
        },
        onKeyPress: (event) => {
          if (
            !event.key.includes('Arrow') &&
            Validator.maskByChar(
              event.target.value.slice(0, event.target.value.indexOf('_')) + event.key,
              maskArray.join(''),
            )
          ) {
            event.target.value = addMask(
              event.target.value.slice(0, event.target.value.indexOf('_')) + event.key,
              maskArray,
            );
            input.props.onKeyPress(event);
          }

          event.preventDefault();
        },
        onBlur: (event) => {
          const firstPlaceholder = event.target.value.indexOf('_');
          event.target.value = event.target.value.slice(0, firstPlaceholder);
          input.props.onBlur(event);
        },
      });
    }
    if (!/[9aAh%#](?!(\\)(?!\\))/.test(maskArray[input.props.value.length])) {
      input.props.onInput({
        target: {
          name: input.props.name,
          value: input.props.value + maskArray[input.props.value.length].replace(/([9aAh%#])\\(?!\\)/g, '$1'),
        },
      });
    }
  }
  return React.cloneElement(input, {
    onClick: (event) => {
      const firstPlaceholder = event.target.value.indexOf('_');
      console.log(firstPlaceholder);
      event.target.setSelectionRange(firstPlaceholder, firstPlaceholder);
    },
    onFocus: (event) => {
      event.target.value = addMask(event.target.value, maskArray);
    },
    onKeyDown: (event) => {
      console.log(event.key);
      if (event.key === 'Backspace' /*backspace */) {
        const target = event.target;
        let { value } = event.target;
        const start = target.selectionStart - 1;
        const end = target.selectionEnd;
        console.log(target.value.substring(target.selectionStart - 1, target.selectionEnd));
        console.log(value.split('').splice(start, end - start));

        value = value.split('');
        value.splice(
          start,
          end - start,
          target.value.substring(start, end).replace(
            new RegExp(
              `[^${maskArray
                .filter((el, i, arr) => !arr.slice(i + 1).includes(el))
                .join('')
                .replace(/[9aAh%#](?!(\\)(?!\\))/g, '')
                .replace(/([9aAh%#])\\(?!\\)/, '$1')}]+`,
              'g',
            ),
            '_',
          ),
        );
        event.target.value = value.join('');
        event.preventDefault();
        return;
      }
    },
    onKeyPress: (event) => {
      if (
        !event.key.includes('Arrow') &&
        Validator.maskByChar(
          event.target.value.slice(0, event.target.value.indexOf('_')) + event.key,
          maskArray.join(''),
        )
      ) {
        event.target.value = addMask(
          event.target.value.slice(0, event.target.value.indexOf('_')) + event.key,
          maskArray,
        );
        input.props.onKeyPress(event);
      }

      event.preventDefault();
    },
    onBlur: (event) => {
      const firstPlaceholder = event.target.value.indexOf('_');
      console.log(firstPlaceholder);
      event.target.value = event.target.value.slice(
        0,
        firstPlaceholder < 0 ? event.target.value.length : firstPlaceholder,
      );
      input.props.onBlur(event);
    },
  });
}

function addMask(string, maskArray) {
  const mask = string.length ? maskArray.slice(string.length).join('') : maskArray.join('');
  return string + mask.replace(/[9aAh%#](?!(\\)(?!\\))/g, '_').replace(/([9aAh%#])\\(?!\\)/, '$1');
}
// MaskedInput.defaultProps = {
//   type: 'default',
// };

// MaskedInput.propTypes = {
//   type: PropTypes.oneOf(['invisible', 'default']),
//   children:
// };

export default MaskedInput;
