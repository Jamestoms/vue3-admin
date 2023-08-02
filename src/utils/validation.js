import { parsePhoneNumber } from "awesome-phonenumber";
export function requiredInputItem(label) {
  return {
    required: true,
    message: `请输入${label}`,
    trigger: "blur",
  };
}
export function requiredSelectItem(label) {
  return {
    required: true,
    message: `请选择${label}`,
    trigger: ["change", "blur"],
  };
}
export function validLength(label, min, max) {
  return {
    min,
    max,
    message: `${label}长度在${min}到${max}之间`,
    trigger: "blur",
  };
}
export function validNumber() {
  return {
    type: "number",
    message: "请输入数字",
    trigger: "blur",
  };
}
export function validInteger() {
  return {
    type: "integer",
    message: "请输入整数",
    trigger: ["change", "blur"],
  };
}
export function validFloat() {
  return {
    type: "float",
    message: "请输入小数",
    trigger: "blur",
  };
}
export function validArray() {
  return {
    type: "array",
    message: "请输入数组",
    trigger: "blur",
  };
}
export function validsArrayLength(label, min, max) {
  return {
    type: "array",
    min: min,
    max: max,
    message: `数组长度在${min}到${max}之间`,
    trigger: "blur",
  };
}
export function validString() {
  return {
    type: "string",
    message: "请输入字符串",
    trigger: "blur",
  };
}
export function validUrl() {
  return {
    type: "url",
    message: "请输入正确的URL",
    trigger: "blur",
  };
}
export function validEmail() {
  return {
    type: "email",
    message: "请输入正确的email地址",
    trigger: "blur",
  };
}
export function getDecimalNumber(label, decimal) {
  // 整数、小数、且小数不能超过decimal位
  const pattern = "^[-]?\\d+(\\.\\d{0," + decimal + "})?$";
  return {
    validator(rule, value, callback) {
      const errors = [];
      const regExp = new RegExp(pattern);
      if (value.toString().length > 0 && !regExp.test(value.toString())) {
        errors.push(new Error(`${label}不能超过${decimal}位小数`));
      }
      callback(errors);
    },
  };
}
export function validNaturalName(label, min, max) {
  // 一般名称验证
  // 只能数字字母下划线中划线组成、且必须字母或下划线开头
  return {
    type: "pattern",
    pattern: /^[a-zA-Z_][-_a-zA-Z0-9]{0,}$/,
    message: `请输入${label},包括数字、字母、下划线、中划线，且只能字母或中划线开头`,
    min,
    max,
    trigger: "blur",
  };
}
export function validChineselName() {
  // 中文姓名
  return {
    type: "pattern",
    pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
    message: "请输入中文姓名",
    trigger: "blur",
  };
}
export function validPassword(form) {
  return {
    validator: (rule, value, callback) => {
      const { password1: p1, password2: p2 } = form;
      const blank = (v) => {
        return v === undefined || v === "";
      };
      if (!blank(p1) && !blank(p2) && p1 !== p2) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    },
    trigger: "blur",
  };
}

export function validPhone() {
  return {
    validator: (rule, phone, callback) => {
      const reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      const errors = [];
      if (phone && phone.toString().length > 0 && !reg.test(phone)) {
        errors.push(new Error("手机号码格式不正确"));
      }
      callback(errors);
    },
  };
}

export function validTelephone(mustMobile = false) {
  return {
    validator: (rule, phone, callback) => {
      if (phone && phone.length > 0) {
        const pn = parsePhoneNumber(phone, { regionCode: "CN" });
        if (pn.valid) {
          if (mustMobile && !pn.typeIsMobile) {
            callback(new Error("手机号码格式不正确"));
          } else {
            callback();
          }
        } else {
          callback(new Error("电话号码格式不正确"));
        }
      } else {
        callback();
      }
    },
  };
}
