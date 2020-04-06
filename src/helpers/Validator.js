export default class Validator {
  //* Input validators

  static emailMessage = 'Email is not valid';

  static email = (email) => {
    return /^[a-zA-Z][a-zA-Z0-9_.-]*@(?:(?!.*(?:-{2,}))[\w-]{2,255})\.(?:[a-zа-я]{2,10})$/.test(email);
  };

  static userNameMessage = 'userName must contain from 6 to 64 alphanumeric characters and underscore';

  static userName = (userName, notContains) => {
    const notContainsUnescaped = RegexpUnescapeArray(notContains);

    Validator.userNameMessage = `${Validator.userNameMessage.replace(
      / and not contain: .*/,
      '',
    )} and not contain: "${notContainsUnescaped.join('","')}"`;

    return AddNotContains('^[a-zA-Z_0-9]{6,64}$', notContainsUnescaped).test(userName);
  };

  //

  static passwordMessage =
    'Password must contain at least: <ul><li>8 chars;</li><li>one uppercase and one lowercase letter;</li><li>any special character.</li></ul> Must use only alphanumeric and special characters.';

  static password = (userName, notContains = []) => {
    const notContainsUnecaped = RegexpUnescapeArray(notContains);

    Validator.passwordMessage = `${Validator.passwordMessage.replace(
      / Mustn't contain: .*/,
      '',
    )} Mustn't contain: "${notContains.join('","')}"`;

    return AddNotContains(
      '(^(?:(?=[a-zA-Z0-9~`!@#$%^&*()+=_{}[\\]\\|:;”’?\\/<>,.-]{8,})(?=.*[`!@#$%^&*()+=_{}[\\]\\|:;”’?\\/<>,.-].*)(?=.*[a-z].*)(?=.*_.*)(?=.*[0-9].*)(?=.*[A-Z].*))(.*)$)',
      notContainsUnecaped,
    ).test(userName);
  };

  //

  /* *
   * Mask template:
   * 9 - number [0,9]
   * a - letter [a,z]
   * A -letter [A,Z]
   * h - hex number [0,f]
   * % - any not alphanumeric character
   * # - any symbol
   *
   * Other symbols are considered as static
   * To escape special mask characters use '\': 'a\, 'h\', '9\', '#\', '?\','\\'
   */
  static maskValidator = (input, mask) => {
    if (Validator.lastMask[mask]) {
      if (Object.keys(Validator.lastMask).length >= 10) {
        Validator.lastMask = {};
      }
      let regexp;
      regexp = mask.replace(/9(?!\\(?!\\))/g, '[0-9]');
      regexp = regexp.replace(/a(?!\\(?!\\))/g, '[a-z]');
      regexp = regexp.replace(/A(?!\\(?!\\))/g, '[A-Z]');
      regexp = regexp.replace(/h(?!\\(?!\\))/g, '[0-9a-fA-F]');
      regexp = regexp.replace(/%(?!\\(?!\\))/g, '[^0-9a-zA-Z]');
      regexp = regexp.replace(/#(?!\\(?!\\))/g, '.');
      regexp = regexp.replace(/([9aAh%#])\\(?!\\)/g, '$1');
      Validator.lastMask[mask] = `^${regexp}$`;
    }

    return new RegExp(RegexpUnescape(Validator.lastMask[mask])).test(input);
  };

  static lastMask = {};

  /* *
   * Phone mask template:
   *
   * #  - number [0,9]
   * #* - 1 or more numbers [0,9]
   * +  - '+' sign
   * () - brackets
   */

  static phoneMessage = 'Phone is not valid';

  static phone = (phone, masks = ['#* ###-##-##']) => {
    Validator.phoneLastMasks = masks;
    return RegExp(
      `(^${masks
        .map((mask) =>
          RegexpUnescape(mask)
            .replace(/#\\\*/g, '[0-9]{2,4}')
            .replace(/#/g, '[0-9]'),
        )
        .join('$)|(^')}$)`,
    ).test(phone);
  };

  static phoneLastMasks = [];

  static mobilePhoneMessage = 'Mobile phone is not valid';

  static mobilePhone = (
    phone,
    masks = ['+#* (#*) ###-##-##', '+#* #* ###-##-##', '+#* #* #######', '+#* (#*) #######'],
  ) => {
    Validator.phone(phone, masks);
  };

  //

  static dateTimeMessage = 'Invalid date format';

  /* *
   * Mask template:
   *
   * M    - month number
   * MM   - month number with trailing 0
   * MMM  - month in word (short)
   * MMMM - month in word
   * d    - day number
   * dd   - day number with trailing 0
   * yy   - year number (short)
   * yyyy - year number
   * m    - minutes
   * mm   - minutes with trailing 0
   * s    - seconds
   * ss   - seconds with trailing 0
   * h    - hours (12h-format)
   * hh   - hours with trailing 0 (12h-format)
   * H    - hours (24h-format)
   * HH   - hours with trailing 0 (24h-format)
   * a    - AM / PM mark
   */

  static dateTime = (date, masks = ['MM-dd-yyyy hh:mm:ss']) => {
    Validator.dateTimeLastMasks = masks.replace(/[MmdyHhMmsa]/g, '#');
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthsShort = months.map((month) => [...month].slice(0, 3).join(''));
    const Regexp = RegExp(
      `(^${masks
        .map((mask) => {
          return RegexpUnescape(mask)
            .replace(/(^|[^M])M($|[^M])/g, '$1(?<_0>[1-9]|1[0-2])$2')
            .replace(/(^|[^M])MM($|[^M])/g, '$1(?<_0>0[1-9]|1[0-2])$2')
            .replace(/(^|[^M])MMM($|[^M])/g, `$1(?<_0>${monthsShort.join(')|(')})$2`)
            .replace(/(^|[^M])MMMM($|[^M])/g, `$1(?<_0>${months.join(')|(')})$2`)
            .replace(/(^|[^d])d($|[^d])/g, '$1(?<_1>[1-9]|[12][0-9]|3[01])$2')
            .replace(/(^|[^d])dd($|[^d])/g, '$1(?<_1>0[1-9]|[12][0-9]|3[01])$2')
            .replace(/(^|[^y])yy($|[^y])/g, '$1(?<_2>[1-9][0-9])$2')
            .replace(/(^|[^y])yyyy($|[^y])/g, '$1(?<_2>[1-9][0-9]{3})$2')
            .replace(/(^|[^m])m($|[^m])/g, '$1(?<_3>0|[1-5][0-9])$2')
            .replace(/(^|[^m])mm($|[^m])/g, '$1(?<_3>[0-5][0-9])$2')
            .replace(/(^|[^s])s($|[^s])/g, '$1(?<_4>0|[1-5][0-9])$2')
            .replace(/(^|[^s])ss($|[^s])/g, '$1(?<_4>[0-5][0-9])$2')
            .replace(/(^|[^h])h($|[^h])/g, '$1(?<_5>[0-9]|1[0-2])$2')
            .replace(/(^|[^h])hh($|[^h])/g, '$1(?<_5>0[0-9]|1[0-2])$2')
            .replace(/(^|[^H])H($|[^H])/g, '$1(?<_5>[0-9]|1[0-9]|2[0-3])$2')
            .replace(/(^|[^H])HH($|[^H])/g, '$1(?<_5>0[0-9]|1[0-9]|2[0-3])$2')
            .replace(/(^|[^a])a($|[^a])/g, '$1(AM|PM)$2');
        })
        .join('$)|(^')}$)`,
    );
    return Regexp.test(date);
  };

  static dateTimeLastMasks = [];

  static dateTimeJS = (date) => {
    try {
      Date(date);
    } catch {
      return false;
    }
    return true;
  };

  static float(number, from, to) {
    const num = parseFloat(number);
    return num <= to && num >= from;
  }

  static number(number, from, to) {
    const num = parseInt(number, 10);
    return num <= to && num >= from;
  }

  //

  //* By char validators

  static text(input) {
    return /^[a-zA-Z]+$/.test(input);
  }

  static numericByChar(input) {
    return /^(?=[^,.]*[,.]?[^,.]*)([0-9,.]+)$/.test(input);
  }

  static alphanumeric(input) {
    if (/[0-9_]/.test(input[0])) {
      return false;
    }
    return /^[0-9a-zA-Z_]+$/.test(input);
  }

  /* *
   * Mask template:
   * 9 - number [0,9]
   * a - letter [a,z]
   * A -letter [A,Z]
   * h - hex number [0,f]
   * % - any not alphanumeric character
   * # - any symbol
   *
   * Other symbols are considered as static
   * To escape special mask characters use '\': 'a\, 'h\', '9\', '#\','\\'
   */
  static maskByChar = (input, mask) => {
    const maskArray = mask.split(/(a\\(?!\\))|(h\\(?!\\))|(#\\(?!\\))|(9\\(?!\\))|(\\\\)|()/).filter((el) => el);
    const currMaskEl = maskArray[input.length - 1];
    if (!currMaskEl) {
      return false;
    }

    let regexp;
    switch (currMaskEl) {
      case '9':
        regexp = '[0-9]';
        break;
      case 'a':
        regexp = '[a-z]';
        break;
      case 'A':
        regexp = '[A-Z]';
        break;
      case 'h':
        regexp = '[0-9a-fA-F]';
        break;
      case '%':
        regexp = '[^0-9a-zA-Z]';
        break;
      case '#':
        regexp = '.';
        break;
      default:
        regexp = currMaskEl.match(/([9aAh%#\\])\\/);
        regexp = regexp ? regexp[0] : currMaskEl;
    }

    return new RegExp(RegexpUnescape(regexp)).test(input[input.length - 1]);
  };

  static dateByChar(input, masks = ['MM-dd-yyyy hh:mm:ss']) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthsShort = months.map((month) => [...month].slice(0, 3).join(''));
    const Regexp = RegExp(
      `(^${masks
        .map((mask) => {
          let check = [...mask.slice(input.length - 1)].findIndex((el) => /[^MdymshHa]/.test(el)) + input.length - 1;
          let maskU = RegexpUnescape(mask);

          return (check > input.length
            ? `(.{${input.length - 1}})[0-9]`
            : check === input.length - 1
            ? maskU.slice(0, check + 1)
            : input.length - check >= 2
            ? input.length >= mask.length
              ? maskU
              : `(.{${input.length - 1}})[0-9]`
            : maskU.slice(0, check)
          )
            .replace(/(^|[^M])M($|[^M])/g, '$1(?<_0>[1-9]|1[0-2])$2')
            .replace(/(^|[^M])MM($|[^M])/g, '$1(?<_0>0[1-9]|1[0-2])$2')
            .replace(/(^|[^M])MMM($|[^M])/g, `$1(?<_0>${monthsShort.join(')|(')})$2`)
            .replace(/(^|[^M])MMMM($|[^M])/g, `$1(?<_0>${months.join(')|(')})$2`)
            .replace(/(^|[^d])d($|[^d])/g, '$1(?<_1>[1-9]|[12][0-9]|3[01])$2')
            .replace(/(^|[^d])dd($|[^d])/g, '$1(?<_1>0[1-9]|[12][0-9]|3[01])$2')
            .replace(/(^|[^y])yy($|[^y])/g, '$1(?<_2>[1-9][0-9])$2')
            .replace(/(^|[^y])yyyy($|[^y])/g, '$1(?<_2>[1-9][0-9]{3})$2')
            .replace(/(^|[^m])m($|[^m])/g, '$1(?<_3>0|[1-5][0-9])$2')
            .replace(/(^|[^m])mm($|[^m])/g, '$1(?<_3>[0-5][0-9])$2')
            .replace(/(^|[^s])s($|[^s])/g, '$1(?<_4>0|[1-5][0-9])$2')
            .replace(/(^|[^s])ss($|[^s])/g, '$1(?<_4>[0-5][0-9])$2')
            .replace(/(^|[^h])h($|[^h])/g, '$1(?<_5>[0-9]|1[0-2])$2')
            .replace(/(^|[^h])hh($|[^h])/g, '$1(?<_5>0[0-9]|1[0-2])$2')
            .replace(/(^|[^H])H($|[^H])/g, '$1(?<_5>[0-9]|1[0-9]|2[0-3])$2')
            .replace(/(^|[^H])HH($|[^H])/g, '$1(?<_5>0[0-9]|1[0-9]|2[0-3])$2')
            .replace(/(^|[^a])a($|[^a])/g, '$1(AM|PM)$2');
        })
        .join('$)|(^')}$)`,
    );
    console.log(input, Regexp, Regexp.exec(input));
    return !!Regexp.exec(input) && !!Regexp.exec(input)[0];
  }

  static phoneByChar = (phone, masks) => {
    return RegExp(
      `(^${masks
        .map((mask) =>
          RegexpUnescape(mask.slice(0, mask.length))
            .replace(/#\\\*/g, '[0-9]{2,4}')
            .replace(/#/g, '[0-9]'),
        )
        .join('$)|(^')}$)`,
    ).test(phone);
  };

  static mobilePhoneByChar = (
    phone,
    masks = ['+#* (#*) ###-##-##', '+#* #* ###-##-##', '+#* #* #######', '+#* (#*) #######'],
  ) => {
    Validator.phoneByChar(phone, masks);
  };
}

// Helpers
function AddNotContains(regexp, notContains) {
  return RegExp(
    `${
      notContains.length
        ? `
        (?!(.*((${notContains.join(')|(')})).*))`
        : ''
    }${regexp}`,
  );
}

function RegexpUnescapeArray(array) {
  if (!array || !array.length) {
    return [];
  }
  return array.map((word) => RegexpUnescape(word));
}

function RegexpUnescape(str) {
  return str.replace(/[\\^$.|?*+()]/g, '\\$&');
}
