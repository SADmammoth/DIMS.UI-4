export default class Validator {
  static emailMessage = 'Email is not valid';

  static email = (email) => {
    return /^[a-zA-Z][a-zA-Z0-9_.-]*@(?:(?!.*(?:-{2,}))[\w-]{2,255})\.(?:[a-zа-я]{2,10})$/.test(email);
  };

  static usernameMessage = 'Username must contain from 6 to 64 alphanumeric characters and underscore';

  static username = (username, notContains) => {
    const notContainsUnescaped = RegexpUnescapeArray(notContains);

    Validator.usernameMessage = `${Validator.usernameMessage.replace(
      / and not contain: .*/,
      '',
    )} and not contain: "${notContainsUnescaped.join('","')}"`;

    return AddNotContains('^[a-zA-Z_0-9]{6,64}$', notContainsUnescaped).test(username);
  };

  static passwordMessage =
    'Password must contain at least: <ul><li>8 chars;</li><li>one uppercase and one lowercase letter;</li><li>any special character.</li></ul> Must use only alphanumeric and special characters.';

  static password = (username, notContains = []) => {
    const notContainsUnecaped = RegexpUnescapeArray(notContains);

    Validator.passwordMessage = `${Validator.passwordMessage.replace(
      / Mustn't contain: .*/,
      '',
    )} Mustn't contain: "${notContains.join('","')}"`;

    return AddNotContains(
      '(^(?:(?=[a-zA-Z0-9~`!@#$%^&*()+=_{}[\\]\\|:;”’?\\/<>,.-]{8,})(?=.*[`!@#$%^&*()+=_{}[\\]\\|:;”’?\\/<>,.-].*)(?=.*[a-z].*)(?=.*_.*)(?=.*[0-9].*)(?=.*[A-Z].*))(.*)$)',
      notContainsUnecaped,
    ).test(username);
  };

  static phoneMessage = 'Phone is not valid';

  static phone = (phone, masks) => {
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

  static mobilePhoneMessage = 'Mobile phone is not valid';

  static mobilePhone = (
    phone,
    masks = ['+#* (#*) ###-##-##', '+#* #* ###-##-##', '+#* #* #######', '+#* (#*) #######'],
  ) => {
    Validator.phone(phone, masks);
  };

  static dateTimeMessage = 'Invalid date format';

  static dateTime = (date, masks = ['MM-dd-yyyy hh:mm:ss']) => {
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

  static dateTimeJS = (date) => {
    try {
      Date(date);
    } catch {
      return false;
    }
    return true;
  };

  static text(input) {
    return /^[a-zA-Z]+$/.test(input);
  }

  static numeric(input) {
    return /^(?=[^,.]*[,.]?[^,.]*)([0-9,.]+)$/.test(input);
  }

  static float(number, from, to) {
    const num = parseFloat(number);
    return num <= to && num >= from;
  }

  static number(number, from, to) {
    const num = parseInt(number, 10);
    return num <= to && num >= from;
  }

  static alphanumeric(input) {
    if (/[0-9_]/.test(input[0])) {
      return false;
    }
    return /^[0-9a-zA-Z_]+$/.test(input);
  }

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
          console.log(check, input.length, mask.length);
          // console.log(mask.slice(0, check < 0 ? input.length - 1 : check + input.length - 1));
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
