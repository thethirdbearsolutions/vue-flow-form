'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Language data store

var LanguageModel = function LanguageModel(options) {
  this.enterKey = 'Enter';
  this.shiftKey = 'Shift';
  this.ok = 'OK';
  this.continue = 'Continue';
  this.skip = 'Skip';
  this.pressEnter = 'Press :enterKey';
  this.multipleChoiceHelpText = 'Choose as many as you like';
  this.multipleChoiceHelpTextSingle = 'Choose only one answer';
  this.otherPrompt = 'Other';
  this.placeholder = 'Type your answer here...';
  this.submitText = 'Submit';
  this.longTextHelpText = ':shiftKey + :enterKey to make a line break.';
  this.prev = 'Prev';
  this.next = 'Next';
  this.percentCompleted = ':percent% completed';
  this.invalidPrompt = 'Please fill out the field correctly';
  this.thankYouText = 'Thank you!';
  this.successText = 'Your submission has been sent.';
  this.ariaOk = 'Press to continue';
  this.ariaRequired = 'This step is required';
  this.ariaPrev = 'Previous step';
  this.ariaNext = 'Next step';
  this.ariaSubmitText = 'Press to submit';
  this.ariaMultipleChoice = 'Press :letter to select';
  this.ariaTypeAnswer = 'Type your answer here';
  this.errorAllowedFileTypes = 'Invalid file type. Allowed file types: :fileTypes.';
  this.errorMaxFileSize = 'File(s) too large. Maximum allowed file size: :size.';
  this.errorMinFiles = 'Too few files added. Minimum allowed files: :min.';
  this.errorMaxFiles = 'Too many files added. Maximum allowed files: :max.';

  Object.assign(this, options || {});
};

/**
 * Inserts a new CSS class into the language model string to format the :string
 * Use it in a component's v-html directive: v-html="language.formatString(language.languageString)"
 */
LanguageModel.prototype.formatString = function formatString (string, replacements) {
    var this$1$1 = this;

  return string.replace(/:(\w+)/g, function (match, word) {
    if (this$1$1[word]) {
      return '<span class="f-string-em">' + this$1$1[word] + '</span>'
    } else if (replacements && replacements[word]) {
      return replacements[word]
    }
      
    return match
  })
};

LanguageModel.prototype.formatFileSize = function formatFileSize (bytes) {
  var
    units = ['B', 'kB', 'MB', 'GB', 'TB'],
    i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0;
      
  return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + units[i];
};

/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Global data store

var QuestionType = Object.freeze({
  Date: 'FlowFormDateType',
  Dropdown: 'FlowFormDropdownType',
  Email: 'FlowFormEmailType',
  File: 'FlowFormFileType',
  LongText: 'FlowFormLongTextType',
  MultipleChoice: 'FlowFormMultipleChoiceType',
  MultiplePictureChoice: 'FlowFormMultiplePictureChoiceType',
  MultipleText: 'FlowFormMultipleTextType',
  Number: 'FlowFormNumberType',
  Password: 'FlowFormPasswordType',
  Phone: 'FlowFormPhoneType',
  SectionBreak: 'FlowFormSectionBreakType',
  Text: 'FlowFormTextType',
  Url: 'FlowFormUrlType',
  Matrix: 'FlowFormMatrixType',
  OpinionScale: 'FlowFormOpinionScaleType',
  IconRate: 'FlowFormIconRateType',
});

Object.freeze({
  label: '',
  value: '',
  disabled: true
});

var MaskPresets = Object.freeze({
  Date: '##/##/####',
  DateIso: '####-##-##',
  PhoneUs: '(###) ###-####'
});

var ChoiceOption = function ChoiceOption(options) {
  this.label = '';
  this.value = null;
  this.selected = false;
  this.imageSrc = null;
  this.imageAlt = null;

  Object.assign(this, options);
};

ChoiceOption.prototype.choiceLabel = function choiceLabel () {
  return this.label || this.value
};

ChoiceOption.prototype.choiceValue = function choiceValue () {
  // Returns the value if it's anything other than the default (null).
  if (this.value !== null) {
    return this.value
  }

  // Returns any other non-empty property if the value has not been set.
  return this.label || this.imageAlt || this.imageSrc
};

ChoiceOption.prototype.toggle = function toggle () {
  this.selected = !this.selected;
};

var LinkOption = function LinkOption(options) {
  this.url = '';
  this.text = '';
  this.target = '_blank';

  Object.assign(this, options);
};

var MatrixColumn = function MatrixColumn(options) {
  this.value = '';
  this.label = '';

  Object.assign(this, options);
};

var MatrixRow = function MatrixRow(options) {
  this.id = '';
  this.label = '';

  Object.assign(this, options);
};

var QuestionModel = function QuestionModel(options) {
  // Make sure the options variable is an object
  options = options || {};

  this.id = null;
  this.answer = null;
  this.answered = false;
  this.index = 0;
  this.options = [];
  this.description = '';
  this.className = '';
  this.type = null;
  this.html = null;
  this.required = false;
  this.jump = null;
  this.placeholder = null;
  this.mask = '';
  this.multiple = false;
  this.allowOther = false;
  this.other = null;
  this.language = null;
  this.tagline = null;
  this.title = null;
  this.subtitle = null;
  this.content = null;
  this.inline = false;
  this.helpText = null;
  this.helpTextShow = true;
  this.descriptionLink = [];
  this.min = null;
  this.max = null;
  this.maxLength = null;
  this.nextStepOnAnswer = false;
  this.accept = null;
  this.maxSize = null;
  this.rows = [];
  this.columns = [];
  this.labelLeft = null;
  this.labelRight = null;
  this.subquestions = [];

  Object.assign(this, options);

  // Sets default mask and placeholder value on PhoneType question
  if (this.type === QuestionType.Phone) {
    if (!this.mask) {
      this.mask = MaskPresets.Phone;
    }
    if (!this.placeholder) {
      this.placeholder = this.mask;
    }
  }

  if (this.type === QuestionType.Url) {
    this.mask = null;
  }

  if (this.type === QuestionType.Date && !this.placeholder) {
    this.placeholder = 'yyyy-mm-dd';
  }

  if (this.isCompositeType()) {
    this.answer = this.answer || this.getCompositeEmptyAnswer();
  } else if (this.type !== QuestionType.Matrix && this.multiple && !Array.isArray(this.answer)) {
    this.answer = this.answer ? [this.answer] : [];
  }

  // Check if we have an answer already (when we have a pre-filled form)
  // and set the answered property accordingly
  if (!this.required && typeof options.answer !== 'undefined') {
    this.answered = true;
  } else if (this.answer && (!this.multiple || this.answer.length)) {
    this.answered = true;
  }

  this.resetOptions();
};

QuestionModel.prototype.getJumpId = function getJumpId () {
  var nextId = null;

  if (typeof this.jump === 'function') {
    nextId = this.jump.call(this);
  } else if (this.jump[this.answer]) {
    nextId = this.jump[this.answer];
  } else if (this.jump['_other']) {
    nextId = this.jump['_other'];
  }

  return nextId
};

QuestionModel.prototype.setAnswer = function setAnswer (answer) {
  if (this.type === QuestionType.Number && answer !== '' && !isNaN(+answer)) {
    answer = +answer;
  }

  this.answer = answer;
};

QuestionModel.prototype.setIndex = function setIndex (index) {
  if (!this.id) {
    this.id = 'q_' + index;
  }

  this.index = index;
};

QuestionModel.prototype.resetOptions = function resetOptions () {
    var this$1$1 = this;

  if (this.options) {
    var isArray = Array.isArray(this.answer);
    var numSelected = 0;

    this.options.forEach(function (o) {
      var optionValue = o.choiceValue();

      if (this$1$1.answer === optionValue || (isArray && this$1$1.answer.indexOf(optionValue) !== -1)) {
        o.selected = true;
        ++numSelected;
      } else {
        o.selected = false;
      }
    });

    if (this.allowOther) {
      var otherAnswer = null;

      if (isArray) {
        if (this.answer.length && this.answer.length !== numSelected) {
          otherAnswer = this.answer[this.answer.length - 1];
        }
      } else if (this.options.map(function (o) { return o.choiceValue(); }).indexOf(this.answer) === -1) {
        otherAnswer = this.answer;
      }

      if (otherAnswer !== null) {
        this.other = otherAnswer;
      }
    }
  }
};

QuestionModel.prototype.resetAnswer = function resetAnswer () {
  this.answered = false;
  if (this.isCompositeType()) {
    this.answer = this.getCompositeEmptyAnswer();
  } else {
    this.answer = this.multiple ? [] : null;
  }
  this.other = null;

  this.resetOptions();
};

QuestionModel.prototype.isCompositeType = function isCompositeType () {
  return [QuestionType.MultipleText].includes(this.type)
};

QuestionModel.prototype.getCompositeEmptyAnswer = function getCompositeEmptyAnswer () {
  return this.subquestions.map(function (q) { return q.id; }).reduce(function (a, v) {
      var obj;

      return (Object.assign({}, a, ( obj = {}, obj[v] = '', obj )));
    }, {}) 
};
  
QuestionModel.prototype.isMultipleChoiceType = function isMultipleChoiceType () {
  return [QuestionType.MultipleChoice, QuestionType.MultiplePictureChoice].includes(this.type)
};

/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

var
  isIos = false,
  isMobile = false;

if (typeof navigator !== 'undefined' && typeof document !== 'undefined') {
  // Simple mobile device/tablet detection
  isIos = navigator.userAgent.match(/iphone|ipad|ipod/i) || (navigator.userAgent.indexOf('Mac') !== -1 && 'ontouchend' in document);
  isMobile = isIos || navigator.userAgent.match(/android/i);
}

// Mixin that adds `isMobile` and `isIos` data variables
var IsMobile = {
  data: function data() {
    return {
      isIos: isIos,
      isMobile: isMobile
    }
  }
};

var script$m = {
    name: 'FlowFormBaseType',

    props: {
      language: LanguageModel,
      question: QuestionModel,
      active: Boolean,
      disabled: Boolean,
      modelValue: [String, Array, Boolean, Number, Object]
    },

    mixins: [
      IsMobile ],

    data: function data() {
      return {
        dirty: false,
        dataValue: null,
        answer: null,
        enterPressed: false,
        allowedChars: null,
        alwaysAllowedKeys: ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'],
        focused: false,
        canReceiveFocus: false,
        errorMessage: null
      }
    },

    mounted: function mounted() {
      if (this.question.answer) {
        this.dataValue = this.answer = this.question.answer;
      } else if (this.question.multiple) {
        this.dataValue = [];
      }
    },

    methods: {
      /**
       * This method can be overriden in custom components to 
       * change the answer before going through validation.
       */
      fixAnswer: function fixAnswer(answer) {
        return answer
      },

      getElement: function getElement() {
        var el = this.$refs.input;

        // Sometimes the input is nested so we need to find it
        while (el && el.$el) {
          el = el.$el;
        }

        return el
      },

      setFocus: function setFocus() {
        this.focused = true;
      },

      // eslint-disable-next-line no-unused-vars
      unsetFocus: function unsetFocus($event) {
        this.focused = false;
      },

      focus: function focus() {
        if (!this.focused) {
          var el = this.getElement();

          el && el.focus();
        }
      },

      blur: function blur() {
        var el = this.getElement();

        el && el.blur();
      },

      onKeyDown: function onKeyDown($event) {
        this.enterPressed = false;
        clearTimeout(this.timeoutId);

        if ($event) {
          if ($event.key === 'Enter' && !$event.shiftKey) {
            this.unsetFocus();
          }

          if (this.allowedChars !== null) {
            // Check if the entered character is allowed.
            // We always allow keys from the alwaysAllowedKeys array.
            if (this.alwaysAllowedKeys.indexOf($event.key) === -1 && this.allowedChars.indexOf($event.key) === -1) {
              $event.preventDefault();
            }
          }
        }
      },

      onCompositeChange: function onCompositeChange($event, key) {
        this.dirty = true;
        this.dataValue[key] = $event.target.value;

        this.onKeyDown();
        this.setAnswer(this.dataValue);
      },
      
      onChange: function onChange($event) {
        this.dirty = true;
        this.dataValue = $event.target.value;

        this.onKeyDown();
        this.setAnswer(this.dataValue);
      },

      onEnter: function onEnter() {
        console.log(this.question.type);
        if (this.question.type === 'FlowFormMultipleTextType') {
          return;
        }
        this._onEnter();
      },

      _onEnter: function _onEnter() {
        this.enterPressed = true;

        this.dataValue = this.fixAnswer(this.dataValue);
        this.setAnswer(this.dataValue);
        this.isValid() ? this.blur() : this.focus();
      },

      setAnswer: function setAnswer(answer) {
        this.question.setAnswer(answer);

        this.answer = this.question.answer;
        this.question.answered = this.isValid();

        this.$emit('update:modelValue', this.answer);
      },

      showInvalid: function showInvalid() {
        return this.dirty && this.enterPressed && !this.isValid()
      },

      isValid: function isValid() {
        if (!this.question.required && !this.hasValue && this.dirty) {
          return true
        }

        if (this.validate()) {
          return true
        }

        return false
      },
      
      /**
       * This method validates the input and is meant to be overriden
       * in custom question types.
       */
      validate: function validate() {
        return !this.question.required || this.hasValue
      }
    },
    
    computed: {
      placeholder: function placeholder() {
        return this.question.placeholder || this.language.placeholder
      },

      hasValue: function hasValue() {
        if (this.dataValue !== null) {
          var v = this.dataValue;

          if (v.trim) {
            // Don't allow empty strings
            return v.trim().length > 0
          }

          if (Array.isArray(v)) {
            // Don't allow empty arrays
            return v.length > 0
          }

          // All other non-null values are allowed to pass through
          return true
        }

        return false
      }
    }
  };

script$m.__file = "src/components/QuestionTypes/BaseType.vue";

var script$l = {
    extends: script$m,

    name: QuestionType.Dropdown,

    computed: {
      answerLabel: function answerLabel() {
        for (var i = 0; i < this.question.options.length; i++) {
          var option = this.question.options[i];

          if (option.choiceValue() === this.dataValue) {
            return option.choiceLabel()
          }
        }

        return this.question.placeholder
      }
    },

    methods: {
      onKeyDownListener: function onKeyDownListener($event) {
        if ($event.key === 'ArrowDown' || $event.key === 'ArrowUp') {
          this.setAnswer(this.dataValue);
        } else if ($event.key === 'Enter' && this.hasValue) {
          this.focused = false;
          this.blur();
        }
      },
      
      onKeyUpListener: function onKeyUpListener($event) {
        if ($event.key === 'Enter' && this.isValid() && !this.disabled) {
          $event.stopPropagation();
          this._onEnter();
          this.$emit('next');
        }
      }
    }
  };

var _hoisted_1$a = { class: "faux-form" };
var _hoisted_2$8 = ["value", "required"];
var _hoisted_3$5 = {
  key: 0,
  label: " ",
  value: "",
  disabled: "",
  selected: "",
  hidden: ""
};
var _hoisted_4$5 = ["disabled", "value"];
var _hoisted_5$5 = /*#__PURE__*/vue.createElementVNode("span", { class: "f-arrow-down" }, [
  /*#__PURE__*/vue.createElementVNode("svg", {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "-163 254.1 284.9 284.9",
    style: "",
    "xml:space": "preserve"
  }, [
    /*#__PURE__*/vue.createElementVNode("g", null, [
      /*#__PURE__*/vue.createElementVNode("path", { d: "M119.1,330.6l-14.3-14.3c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,1-6.6,2.9L-20.5,428.5l-112.2-112.2c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,0.9-6.6,2.9l-14.3,14.3c-1.9,1.9-2.9,4.1-2.9,6.6c0,2.5,1,4.7,2.9,6.6l133,133c1.9,1.9,4.1,2.9,6.6,2.9s4.7-1,6.6-2.9l133.1-133c1.9-1.9,2.8-4.1,2.8-6.6C121.9,334.7,121,332.5,119.1,330.6z" })
    ])
  ])
], -1 /* HOISTED */);

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("span", _hoisted_1$a, [
    vue.createElementVNode("select", {
      ref: "input",
      class: "",
      value: _ctx.dataValue,
      onChange: _cache[0] || (_cache[0] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return (_ctx.onChange && _ctx.onChange.apply(_ctx, args));
  }),
      onKeydown: _cache[1] || (_cache[1] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ($options.onKeyDownListener && $options.onKeyDownListener.apply($options, args));
  }),
      onKeyup: _cache[2] || (_cache[2] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ($options.onKeyUpListener && $options.onKeyUpListener.apply($options, args));
  }),
      required: _ctx.question.required
    }, [
      (_ctx.question.required)
        ? (vue.openBlock(), vue.createElementBlock("option", _hoisted_3$5, " "))
        : vue.createCommentVNode("v-if", true),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.question.options, function (option, index) {
        return (vue.openBlock(), vue.createElementBlock("option", {
          disabled: option.disabled,
          value: option.choiceValue(),
          key: 'o' + index
        }, vue.toDisplayString(option.choiceLabel()), 9 /* TEXT, PROPS */, _hoisted_4$5))
      }), 128 /* KEYED_FRAGMENT */))
    ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$8),
    vue.createElementVNode("span", null, [
      vue.createElementVNode("span", {
        class: vue.normalizeClass(["f-empty", {'f-answered': this.question.answer && this.question.answered}])
      }, vue.toDisplayString($options.answerLabel), 3 /* TEXT, CLASS */),
      _hoisted_5$5
    ])
  ]))
}

script$l.render = render$c;
script$l.__file = "src/components/QuestionTypes/DropdownType.vue";

function maskit (value, mask, masked, tokens) {
  if ( masked === void 0 ) masked = true;

  value = value || '';
  mask = mask || '';
  var iMask = 0;
  var iValue = 0;
  var output = '';
  while (iMask < mask.length && iValue < value.length) {
    var cMask = mask[iMask];
    var masker = tokens[cMask];
    var cValue = value[iValue];
    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
      	output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++; // take the next mask char and treat it as char
        cMask = mask[iMask];
      }
      if (masked) { output += cMask; }
      if (cValue === cMask) { iValue++; } // user typed the same char
      iMask++;
    }
  }

  // fix mask that ends with a char: (#)
  var restOutput = '';
  while (iMask < mask.length && masked) {
    var cMask = mask[iMask];
    if (tokens[cMask]) {
      restOutput = '';
      break
    }
    restOutput += cMask;
    iMask++;
  }

  return output + restOutput
}

function dynamicMask (maskit, masks, tokens) {
  masks = masks.sort(function (a, b) { return a.length - b.length; });
  return function (value, mask, masked) {
    if ( masked === void 0 ) masked = true;

    var i = 0;
    while (i < masks.length) {
      var currentMask = masks[i];
      i++;
      var nextMask = masks[i];
      if (! (nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length) ) {
        return maskit(value, currentMask, masked, tokens)
      }
    }
    return '' // empty masks
  }
}

// Facade to maskit/dynamicMask when mask is String or Array
function masker (value, mask, masked, tokens) {
  if ( masked === void 0 ) masked = true;

  return Array.isArray(mask)
         ? dynamicMask(maskit, mask, tokens)(value, mask, masked, tokens)
         : maskit(value, mask, masked, tokens)
}

var tokens = {
  '#': {pattern: /\d/},
  'X': {pattern: /[0-9a-zA-Z]/},
  'S': {pattern: /[a-zA-Z]/},
  'A': {pattern: /[a-zA-Z]/, transform: function (v) { return v.toLocaleUpperCase(); }},
  'a': {pattern: /[a-zA-Z]/, transform: function (v) { return v.toLocaleLowerCase(); }},
  '!': {escape: true}
};

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function event (name) {
  var evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  return evt
}

function mask (el, binding) {
  var config = binding.value;
  if (Array.isArray(config) || typeof config === 'string') {
    config = {
      mask: config,
      tokens: tokens
    };
  }

  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    var els = el.getElementsByTagName('input');
    if (els.length !== 1) {
      throw new Error("v-mask directive requires 1 input, found " + els.length)
    } else {
      el = els[0];
    }
  }

  el.oninput = function (evt) {
    if (!evt.isTrusted) { return } // avoid infinite loop
    /* other properties to try to diferentiate InputEvent of Event (custom)
    InputEvent (native)
      cancelable: false
      isTrusted: true

      composed: true
      isComposing: false
      which: 0

    Event (custom)
      cancelable: true
      isTrusted: false
    */
    // by default, keep cursor at same position as before the mask
    var position = el.selectionEnd;
    // save the character just inserted
    var digit = el.value[position-1];
    el.value = masker(el.value, config.mask, true, config.tokens);
    // if the digit was changed, increment position until find the digit again
    while (position < el.value.length && el.value.charAt(position-1) !== digit) {
      position++;
    }
    if (el === document.activeElement) {
      el.setSelectionRange(position, position);
      setTimeout(function () {
        el.setSelectionRange(position, position);
      }, 0);
    }
    el.dispatchEvent(event('input'));
  };

  var newDisplay = masker(el.value, config.mask, true, config.tokens);
  if (newDisplay !== el.value) {
    el.value = newDisplay;
    el.dispatchEvent(event('input'));
  }
}

var script$k = {
  name: 'TheMask',
  props: {
    value: [String, Number],
    mask: {
      type: [String, Array],
      required: true
    },
    masked: { // by default emits the value unformatted, change to true to format with the mask
      type: Boolean,
      default: false // raw
    },
    tokens: {
      type: Object,
      default: function () { return tokens; }
    }
  },
  directives: {mask: mask},
  data: function data () {
    return {
      lastValue: null, // avoid unecessary emit when has no change
      display: this.value
    }
  },
  watch : {
    value: function value (newValue) {
      if (newValue !== this.lastValue) {
        this.display = newValue;
      }
    },
    masked: function masked () {
      this.refresh(this.display);
    }
  },
  computed: {
    config: function config () {
      return {
        mask: this.mask,
        tokens: this.tokens,
        masked: this.masked
      }
    }
  },
  methods: {
    onInput: function onInput (e) {
      if (e.isTrusted) { return } // ignore native event
      this.refresh(e.target.value);
    },

    refresh: function refresh (value) {
      this.display = value;
      var value = masker(value, this.mask, this.masked, this.tokens);
      if (value !== this.lastValue) {
        this.lastValue = value;
        this.$emit('input', value);
      }
    }
  }
};

var _hoisted_1$9 = ["value"];

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_mask = vue.resolveDirective("mask");

  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
    type: "text",
    value: $data.display,
    onInput: _cache[0] || (_cache[0] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return ($options.onInput && $options.onInput.apply($options, args));
  })
  }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$9)), [
    [_directive_mask, $options.config]
  ])
}

script$k.render = render$b;
script$k.__file = "node_modules/vue-the-mask/src/component.vue";

var script$j = {
    extends: script$m,
    name: QuestionType.Text,
    components: {
      TheMask: script$k
    },

    data: function data() {
      return {
        inputType: 'text',
        canReceiveFocus: true
      }
    },

    methods: {
      validate: function validate() {
        if (this.question.mask && this.hasValue) {
          return this.validateMask()
        }

        return !this.question.required || this.hasValue
      },

      validateMask: function validateMask() {
        var this$1$1 = this;

        if (Array.isArray(this.question.mask)) {
          return this.question.mask.some(function (mask) { return mask.length === this$1$1.dataValue.length; })
        }

        return this.dataValue.length === this.question.mask.length
      }
    }
  };

var _hoisted_1$8 = ["data-placeholder"];
var _hoisted_2$7 = ["type", "value", "required", "min", "max", "placeholder", "maxlength"];

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_the_mask = vue.resolveComponent("the-mask");

  return (vue.openBlock(), vue.createElementBlock("span", {
    "data-placeholder": $data.inputType === 'date' ? _ctx.placeholder : null
  }, [
    (_ctx.question.mask)
      ? (vue.openBlock(), vue.createBlock(_component_the_mask, {
          key: 0,
          ref: "input",
          mask: _ctx.question.mask,
          masked: false,
          type: $data.inputType,
          value: _ctx.modelValue,
          required: _ctx.question.required,
          onKeydown: _ctx.onKeyDown,
          onKeyup: [
            _ctx.onChange,
            vue.withKeys(vue.withModifiers(_ctx.onEnter, ["prevent"]), ["enter"]),
            vue.withKeys(vue.withModifiers(_ctx.onEnter, ["prevent"]), ["tab"])
          ],
          onFocus: _ctx.setFocus,
          onBlur: _ctx.unsetFocus,
          placeholder: _ctx.placeholder,
          min: _ctx.question.min,
          max: _ctx.question.max,
          onChange: _ctx.onChange
        }, null, 8 /* PROPS */, ["mask", "type", "value", "required", "onKeydown", "onKeyup", "onFocus", "onBlur", "placeholder", "min", "max", "onChange"]))
      : (vue.openBlock(), vue.createElementBlock("input", {
          key: 1,
          ref: "input",
          type: $data.inputType,
          value: _ctx.modelValue,
          required: _ctx.question.required,
          onKeydown: _cache[0] || (_cache[0] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return (_ctx.onKeyDown && _ctx.onKeyDown.apply(_ctx, args));
  }),
          onKeyup: [
            _cache[1] || (_cache[1] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return (_ctx.onChange && _ctx.onChange.apply(_ctx, args));
  }),
            _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers(function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return (_ctx.onEnter && _ctx.onEnter.apply(_ctx, args));
  }, ["prevent"]), ["enter"])),
            _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return (_ctx.onEnter && _ctx.onEnter.apply(_ctx, args));
  }, ["prevent"]), ["tab"]))
          ],
          onFocus: _cache[4] || (_cache[4] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return (_ctx.setFocus && _ctx.setFocus.apply(_ctx, args));
  }),
          onBlur: _cache[5] || (_cache[5] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return (_ctx.unsetFocus && _ctx.unsetFocus.apply(_ctx, args));
  }),
          min: _ctx.question.min,
          max: _ctx.question.max,
          onChange: _cache[6] || (_cache[6] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return (_ctx.onChange && _ctx.onChange.apply(_ctx, args));
  }),
          placeholder: _ctx.placeholder,
          maxlength: _ctx.question.maxLength
        }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$7))
  ], 8 /* PROPS */, _hoisted_1$8))
}

script$j.render = render$a;
script$j.__file = "src/components/QuestionTypes/TextType.vue";

var script$i = {
    extends: script$j,
    name: QuestionType.Email,
    data: function data() {
      return {
        inputType: 'email'
      }
    },
    methods: {
      validate: function validate() {
        if (this.hasValue) {
          return /^[^@]+@.+[^.]$/.test(this.dataValue)
        }

        return !this.question.required
      }
    }
  };

script$i.__file = "src/components/QuestionTypes/EmailType.vue";

var script$h = {
  name: 'TextareaAutosize',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    autosize: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: [Number],
      'default': null
    },
    maxHeight: {
      type: [Number],
      'default': null
    },
    /*
     * Force !important for style properties
     */
    important: {
      type: [Boolean, Array],
      default: false
    }
  },
  data: function data () {
    return {
      // data property for v-model binding with real textarea tag
      val: null,
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      height: 'auto'
    }
  },
  computed: {
    computedStyles: function computedStyles () {
      if (!this.autosize) { return {} }
      return {
        resize: !this.isResizeImportant ? 'none' : 'none !important',
        height: this.height,
        overflow: this.maxHeightScroll ? 'auto' : (!this.isOverflowImportant ? 'hidden' : 'hidden !important')
      }
    },
    isResizeImportant: function isResizeImportant () {
      var imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes('resize'))
    },
    isOverflowImportant: function isOverflowImportant () {
      var imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes('overflow'))
    },
    isHeightImportant: function isHeightImportant () {
      var imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes('height'))
    }
  },
  watch: {
    value: function value (val) {
      this.val = val;
    },
    val: function val (val$1) {
      this.$nextTick(this.resize);
      this.$emit('input', val$1);
    },
    minHeight: function minHeight () {
      this.$nextTick(this.resize);
    },
    maxHeight: function maxHeight () {
      this.$nextTick(this.resize);
    },
    autosize: function autosize (val) {
      if (val) { this.resize(); }
    }
  },
  methods: {
    resize: function resize () {
      var this$1$1 = this;

      var important = this.isHeightImportant ? 'important' : '';
      this.height = "auto" + (important ? ' !important' : '');
      this.$nextTick(function () {
        var contentHeight = this$1$1.$el.scrollHeight + 1;

        if (this$1$1.minHeight) {
          contentHeight = contentHeight < this$1$1.minHeight ? this$1$1.minHeight : contentHeight;
        }

        if (this$1$1.maxHeight) {
          if (contentHeight > this$1$1.maxHeight) {
            contentHeight = this$1$1.maxHeight;
            this$1$1.maxHeightScroll = true;
          } else {
            this$1$1.maxHeightScroll = false;
          }
        }

        var heightVal = contentHeight + 'px';
        this$1$1.height = "" + heightVal + (important ? ' !important' : '');
      });

      return this
    }
  },
  created: function created () {
    this.val = this.value;
  },
  mounted: function mounted () {
    this.resize();
  }
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
    style: vue.normalizeStyle($options.computedStyles),
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($data.val) = $event); }),
    onFocus: _cache[1] || (_cache[1] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return ($options.resize && $options.resize.apply($options, args));
  })
  }, null, 36 /* STYLE, HYDRATE_EVENTS */)), [
    [vue.vModelText, $data.val]
  ])
}

script$h.render = render$9;
script$h.__file = "node_modules/vue-textarea-autosize/src/components/TextareaAutosize.vue";

var script$g = {
    extends: script$m,

    name: QuestionType.LongText,

    components: {
      TextareaAutosize: script$h
    },

    data: function data () {
      return {
        canReceiveFocus: true
      }
    },

    mounted: function mounted() {
      window.addEventListener('resize', this.onResizeListener);
    },

    beforeUnmount: function beforeUnmount() {
      window.removeEventListener('resize', this.onResizeListener);
    },

    methods: {
      onResizeListener: function onResizeListener() {
        this.$refs.input.resize();
      },

      unsetFocus: function unsetFocus($event) {
        if ($event || !this.isMobile) {
          this.focused = false;
        }
      },

      onEnterDown: function onEnterDown($event) {
        if (!this.isMobile) {
          $event.preventDefault();
        }
      },

      onEnter: function onEnter() {
        this._onEnter();
        
        if (this.isMobile) {
          this.focus();
        }
      }
    }
  };

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_textarea_autosize = vue.resolveComponent("textarea-autosize");

  return (vue.openBlock(), vue.createElementBlock("span", null, [
    vue.createVNode(_component_textarea_autosize, {
      ref: "input",
      rows: "1",
      value: _ctx.modelValue,
      required: _ctx.question.required,
      onKeydown: [
        _ctx.onKeyDown,
        vue.withKeys(vue.withModifiers($options.onEnterDown, ["exact"]), ["enter"])
      ],
      onKeyup: [
        _ctx.onChange,
        vue.withKeys(vue.withModifiers($options.onEnter, ["exact","prevent"]), ["enter"]),
        vue.withKeys(vue.withModifiers($options.onEnter, ["prevent"]), ["tab"])
      ],
      onFocus: _ctx.setFocus,
      onBlur: $options.unsetFocus,
      placeholder: _ctx.placeholder,
      maxlength: _ctx.question.maxLength
    }, null, 8 /* PROPS */, ["value", "required", "onKeydown", "onKeyup", "onFocus", "onBlur", "placeholder", "maxlength"])
  ]))
}

script$g.render = render$8;
script$g.__file = "src/components/QuestionTypes/LongTextType.vue";

var script$f = {
    extends: script$m,
    name: QuestionType.MultipleChoice,

    data: function data() {
      return {
        editingOther: false,
        hasImages: false
      }
    },

    mounted: function mounted() {
      this.addKeyListener();
    },

    beforeUnmount: function beforeUnmount() {
      this.removeKeyListener();
    },

    watch: {
      active: function active(value) {
        if (value) {
          this.addKeyListener();

          if (this.question.multiple && this.question.answered) {
            this.enterPressed = false;
          }
        } else {
          this.removeKeyListener();
        }
      }
    },
    
    methods: {
      addKeyListener: function addKeyListener() {
        this.removeKeyListener();
        document.addEventListener('keyup', this.onKeyListener);
      },

      removeKeyListener: function removeKeyListener() {
        document.removeEventListener('keyup', this.onKeyListener);
      },

      /**
       * Listens for keyboard events (A, B, C, ...)
       */
      onKeyListener: function onKeyListener($event) {
        if (this.active && !this.editingOther && $event.key && $event.key.length === 1) {
          var keyCode = $event.key.toUpperCase().charCodeAt(0);

          if (keyCode >= 65 && keyCode <= 90) {
            var index = keyCode - 65;

            if (index > -1) {
              var option = this.question.options[index];

              if (option) {
                this.toggleAnswer(option);
              } else if (this.question.allowOther && index === this.question.options.length) {
                this.startEditOther();
              }
            }
          }
        }
      },

      getLabel: function getLabel(index) {
        return this.language.ariaMultipleChoice.replace(':letter', this.getToggleKey(index))
      },

      getToggleKey: function getToggleKey(index) {
        var key = 65 + index;

        if (key <= 90) {
          return String.fromCharCode(key)
        }

        return ''
      },

      toggleAnswer: function toggleAnswer(option) {
        if (!this.question.multiple) {
          if (this.question.allowOther) {
            this.question.other = this.dataValue = null;
            this.setAnswer(this.dataValue);
          }

          for (var i = 0; i < this.question.options.length; i++) {
            var o = this.question.options[i];

            if (o.selected) {
              this._toggleAnswer(o);
            }
          }
        }

        this._toggleAnswer(option);
      },

      _toggleAnswer: function _toggleAnswer(option) {
        var optionValue = option.choiceValue();

        option.toggle();

        if (this.question.multiple) {
          this.enterPressed = false;

          if (!option.selected) {
            this._removeAnswer(optionValue);
          } else if (this.dataValue.indexOf(optionValue) === -1) {
            this.dataValue.push(optionValue);
          }
        } else {
          this.dataValue = option.selected ? optionValue : null;
        }

      
        if (this.isValid() && this.question.nextStepOnAnswer && !this.question.multiple && !this.disabled) {
          this.$emit('next');
        }

        this.setAnswer(this.dataValue);
      },

      _removeAnswer: function _removeAnswer(value) {
        var index = this.dataValue.indexOf(value);

        if (index !== -1) {
          this.dataValue.splice(index, 1);
        }
      },

      startEditOther: function startEditOther() {
        var this$1$1 = this;

        this.editingOther = true;
        this.enterPressed = false;

        this.$nextTick(function () {
          this$1$1.$refs.otherInput.focus();
        });
      },

      onChangeOther: function onChangeOther() {
        if (this.editingOther) {
          var
            value = [],
            self = this;

          this.question.options.forEach(function(option) {
            if (option.selected) {
              if (self.question.multiple) {
                value.push(option.choiceValue());
              } else {
                option.toggle();
              }
            }
          });

          if (this.question.other && this.question.multiple) {
            value.push(this.question.other);
          } else if (!this.question.multiple) {
            value = this.question.other;
          }

          this.dataValue = value;
          this.setAnswer(this.dataValue);
        }
      },
      
      stopEditOther: function stopEditOther() {
        this.editingOther = false;
      }
    },

    computed: {
      hasValue: function hasValue() {
        if (this.question.options.filter(function (o) { return o.selected; }).length) {
          return true
        }

        if (this.question.allowOther) {
          return this.question.other && this.question.other.trim().length > 0
        }

        return false
      }
    }
  };

var _hoisted_1$7 = { class: "f-radios-wrap" };
var _hoisted_2$6 = ["onClick", "aria-label"];
var _hoisted_3$4 = {
  key: 0,
  class: "f-image"
};
var _hoisted_4$4 = ["src", "alt"];
var _hoisted_5$4 = { class: "f-label-wrap" };
var _hoisted_6$4 = { class: "f-key" };
var _hoisted_7$4 = {
  key: 0,
  class: "f-label"
};
var _hoisted_8$4 = ["aria-label"];
var _hoisted_9$4 = { class: "f-label-wrap" };
var _hoisted_10$4 = {
  key: 0,
  class: "f-key"
};
var _hoisted_11$4 = {
  key: 2,
  class: "f-selected"
};
var _hoisted_12$4 = { class: "f-label" };
var _hoisted_13$4 = {
  key: 3,
  class: "f-label"
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [
    vue.createElementVNode("ul", {
      class: vue.normalizeClass(["f-radios", {'f-multiple': _ctx.question.multiple}]),
      role: "listbox"
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.question.options, function (option, index) {
        return (vue.openBlock(), vue.createElementBlock("li", {
          onClick: vue.withModifiers(function ($event) { return ($options.toggleAnswer(option)); }, ["prevent"]),
          class: vue.normalizeClass({'f-selected': option.selected}),
          key: 'm' + index,
          "aria-label": $options.getLabel(index),
          role: "option"
        }, [
          ($data.hasImages && option.imageSrc)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$4, [
                vue.createElementVNode("img", {
                  src: option.imageSrc,
                  alt: option.imageAlt
                }, null, 8 /* PROPS */, _hoisted_4$4)
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", _hoisted_5$4, [
            vue.createElementVNode("span", _hoisted_6$4, vue.toDisplayString($options.getToggleKey(index)), 1 /* TEXT */),
            (option.choiceLabel())
              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7$4, vue.toDisplayString(option.choiceLabel()), 1 /* TEXT */))
              : vue.createCommentVNode("v-if", true)
          ])
        ], 10 /* CLASS, PROPS */, _hoisted_2$6))
      }), 128 /* KEYED_FRAGMENT */)),
      (!$data.hasImages && _ctx.question.allowOther)
        ? (vue.openBlock(), vue.createElementBlock("li", {
            key: 0,
            class: vue.normalizeClass(["f-other", {'f-selected': _ctx.question.other, 'f-focus': $data.editingOther}]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers(function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.startEditOther && $options.startEditOther.apply($options, args));
  }, ["prevent"])),
            "aria-label": _ctx.language.ariaTypeAnswer,
            role: "option"
          }, [
            vue.createElementVNode("div", _hoisted_9$4, [
              (!$data.editingOther)
                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10$4, vue.toDisplayString($options.getToggleKey(_ctx.question.options.length)), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true),
              ($data.editingOther)
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                    key: 1,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return ((_ctx.question.other) = $event); }),
                    type: "text",
                    ref: "otherInput",
                    onBlur: _cache[1] || (_cache[1] = function () {
                      var args = [], len = arguments.length;
                      while ( len-- ) args[ len ] = arguments[ len ];

                      return ($options.stopEditOther && $options.stopEditOther.apply($options, args));
  }),
                    onKeyup: [
                      _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers(function () {
                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];

                        return ($options.stopEditOther && $options.stopEditOther.apply($options, args));
  }, ["prevent"]), ["enter"])),
                      _cache[3] || (_cache[3] = function () {
                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];

                        return ($options.onChangeOther && $options.onChangeOther.apply($options, args));
  })
                    ],
                    onChange: _cache[4] || (_cache[4] = function () {
                      var args = [], len = arguments.length;
                      while ( len-- ) args[ len ] = arguments[ len ];

                      return ($options.onChangeOther && $options.onChangeOther.apply($options, args));
  }),
                    maxlength: "256"
                  }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */)), [
                    [vue.vModelText, _ctx.question.other]
                  ])
                : (_ctx.question.other)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_11$4, [
                      vue.createElementVNode("span", _hoisted_12$4, vue.toDisplayString(_ctx.question.other), 1 /* TEXT */)
                    ]))
                  : (vue.openBlock(), vue.createElementBlock("span", _hoisted_13$4, vue.toDisplayString(_ctx.language.otherPrompt), 1 /* TEXT */))
            ])
          ], 10 /* CLASS, PROPS */, _hoisted_8$4))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ]))
}

script$f.render = render$7;
script$f.__file = "src/components/QuestionTypes/MultipleChoiceType.vue";

var script$e = {
    extends: script$f,
    name: QuestionType.MultiplePictureChoice,

    data: function data() {
      return {
        hasImages: true
      }
    }
  };

script$e.__file = "src/components/QuestionTypes/MultiplePictureChoiceType.vue";

var script$d = {
    extends: script$m,
    name: QuestionType.MultipleText,
    components: {
      TheMask: script$k
    },

    data: function data() {
      return {
        inputType: 'text',
        canReceiveFocus: true,
        touched: [],
      }
    },

    methods: {

      unsetCompositeFocus: function unsetCompositeFocus(key) {
        this.touched = ( this.touched ).concat( [key] );
        this.unsetFocus();
      },

      onKeyDown: function onKeyDown($event, key, i) {
        this.enterPressed = false;
        clearTimeout(this.timeoutId);

        if ($event) {
          if ($event.key === 'Enter' && !$event.shiftKey) {
            this.unsetCompositeFocus(key);
            var refName = "input-" + (i+1);
            if (this.$refs[refName]) {
              var el = this.$refs[refName];
              while (el && el.$el) {
                el = el.$el;
              }
              el.focus();
            }
          }

          if (this.allowedChars !== null) {
            // Check if the entered character is allowed.
            // We always allow keys from the alwaysAllowedKeys array.
            if (this.alwaysAllowedKeys.indexOf($event.key) === -1 && this.allowedChars.indexOf($event.key) === -1) {
              $event.preventDefault();
            }
          }
        }
      },
      
      onCompositeEnter: function onCompositeEnter(key) {
        this.touched = ( this.touched ).concat( [key] );
        this.onEnter();
      },

      onCompositeChange: function onCompositeChange($event, key) {
        this.dirty = true;
        this.dataValue[key] = $event.target.value;

        this.touched = ( this.touched ).concat( [key] );
        
        this.onKeyDown();
        this.setAnswer(this.dataValue);
      },
      
      
      validate: function validate() {
        
        for (var i = 0, list = this.question.subquestions.map(function (o) { return o.id; }); i < list.length; i += 1) {
          var key = list[i];

          if (this.touched.indexOf(key) === -1) {
            return false;
          } 
        }
        
        if (this.question.mask && this.hasValue) {
          return this.validateMask()
        }

        return !this.question.required || this.hasValue
      },

      validateMask: function validateMask() {
        var this$1$1 = this;

        if (Array.isArray(this.question.mask)) {
          return this.question.mask.some(function (mask) { return mask.length === this$1$1.dataValue.length; })
        }

        return this.dataValue.length === this.question.mask.length
      }
    }
  };

var _hoisted_1$6 = ["data-placeholder"];
var _hoisted_2$5 = ["type", "value", "required", "onKeydown", "onKeyup", "onBlur", "min", "max", "onChange", "placeholder", "maxlength"];

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_the_mask = vue.resolveComponent("the-mask");

  return (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.question.subquestions, function (subquestion, i) {
    return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: subquestion.id
    }, [
      (typeof _ctx.modelValue === 'object' && _ctx.modelValue !== null)
        ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            "data-placeholder": $data.inputType === 'date' ? _ctx.placeholder : null
          }, [
            (_ctx.question.mask)
              ? (vue.openBlock(), vue.createBlock(_component_the_mask, {
                  key: 0,
                  ref: i === 0 ? 'input' : ("input-" + i),
                  mask: _ctx.question.mask,
                  masked: false,
                  type: $data.inputType,
                  value: _ctx.modelValue[subquestion.id],
                  required: _ctx.question.required,
                  onKeydown: $options.onKeyDown,
                  onKeyup: [
                    function ($event) { return ($options.onCompositeChange($event, subquestion.id)); },
                    vue.withKeys(vue.withModifiers(function ($event) { return ($options.onCompositeEnter(subquestion.id)); }, ["prevent"]), ["enter"]),
                    vue.withKeys(vue.withModifiers(function ($event) { return ($options.onCompositeEnter(subquestion.id)); }, ["prevent"]), ["tab"])
                  ],
                  onFocus: _ctx.setFocus,
                  onBlur: _ctx.unsetFocus,
                  placeholder: subquestion.placeholder,
                  min: _ctx.question.min,
                  max: _ctx.question.max,
                  onChange: function ($event) { return ($options.onCompositeChange($event, subquestion.id)); }
                }, null, 8 /* PROPS */, ["mask", "type", "value", "required", "onKeydown", "onKeyup", "onFocus", "onBlur", "placeholder", "min", "max", "onChange"]))
              : (vue.openBlock(), vue.createElementBlock("input", {
                  key: 1,
                  ref: i === 0 ? 'input' : ("input-" + i),
                  type: $data.inputType,
                  value: _ctx.modelValue[subquestion.id],
                  required: _ctx.question.required,
                  onKeydown: function ($event) { return ($options.onKeyDown($event, subquestion.id, i)); },
                  onKeyup: [
                    function ($event) { return ($options.onCompositeChange($event, subquestion.id)); },
                    vue.withKeys(vue.withModifiers(function ($event) { return ($options.onCompositeEnter(subquestion.id)); }, ["prevent"]), ["enter"]),
                    vue.withKeys(vue.withModifiers(function ($event) { return ($options.onCompositeEnter(subquestion.id)); }, ["prevent"]), ["tab"])
                  ],
                  onBlur: function ($event) { return ($options.unsetCompositeFocus(subquestion.id)); },
                  onFocus: _cache[0] || (_cache[0] = function () {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    return (_ctx.setFocus && _ctx.setFocus.apply(_ctx, args));
    }),
                  min: _ctx.question.min,
                  max: _ctx.question.max,
                  onChange: function ($event) { return ($options.onCompositeChange($event, subquestion.id)); },
                  placeholder: subquestion.placeholder,
                  maxlength: _ctx.question.maxLength
                }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$5))
          ], 8 /* PROPS */, _hoisted_1$6))
        : vue.createCommentVNode("v-if", true)
    ], 64 /* STABLE_FRAGMENT */))
  }), 128 /* KEYED_FRAGMENT */))
}

script$d.render = render$6;
script$d.__file = "src/components/QuestionTypes/MultipleTextType.vue";

var script$c = {
    extends: script$j,
    name: QuestionType.Number,

    data: function data() {
      return {
        inputType: 'tel',
        allowedChars: '-0123456789.'
      }
    },

    methods: {
      validate: function validate() {
        if (this.question.min !== null && !isNaN(this.question.min) && +this.dataValue < +this.question.min) {
          return false
        }

        if (this.question.max !== null && !isNaN(this.question.max) && +this.dataValue > +this.question.max) {
          return false
        }

        if (this.hasValue) {
          if (this.question.mask) {
            return this.validateMask()
          }

          return !isNaN(+this.dataValue)
        }

        return !this.question.required || this.hasValue
      }
    }
  };

script$c.__file = "src/components/QuestionTypes/NumberType.vue";

var script$b = {
    extends: script$j,
    name: QuestionType.Password,
    data: function data() {
      return {
        inputType: 'password'
      }
    }
  };

script$b.__file = "src/components/QuestionTypes/PasswordType.vue";

var script$a = {
    extends: script$j,
    name: QuestionType.Phone,
    data: function data() {
      return {
        inputType: 'tel', 
        canReceiveFocus: true
      }
    }
  };

script$a.__file = "src/components/QuestionTypes/PhoneType.vue";

var script$9 = {
    extends: script$m,
    name: QuestionType.SectionBreak,
    methods: {
      onEnter: function onEnter() {
        this.dirty = true;

        this._onEnter();
      },

      isValid: function isValid() {
        return true
      }
    }
  };

var _hoisted_1$5 = {
  key: 0,
  class: "f-content"
};
var _hoisted_2$4 = { class: "f-section-text" };

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.question.content)
    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
        vue.createElementVNode("span", _hoisted_2$4, vue.toDisplayString(_ctx.question.content), 1 /* TEXT */)
      ]))
    : vue.createCommentVNode("v-if", true)
}

script$9.render = render$5;
script$9.__file = "src/components/QuestionTypes/SectionBreakType.vue";

var script$8 = {
    extends: script$j,
    name: QuestionType.Url,
    data: function data() {
      return {
        inputType: 'url'
      }
    },
    methods: {
      fixAnswer: function fixAnswer(answer) {
        if (answer && answer.indexOf('://') === -1) {
          // Insert https protocol to make it easier to enter
          // correct URLs
          answer = 'https://' + answer;
        }

        return answer
      },

      validate: function validate() {
        if (this.hasValue) {
          try {
            new URL(this.fixAnswer(this.dataValue));

            return true
          } catch(_) { 
            // Invalid URL
            return false
          }
        }

        return !this.question.required
      }
    }
  };

script$8.__file = "src/components/QuestionTypes/UrlType.vue";

var script$7 = {
    extends: script$j,
    name: QuestionType.Date,
    data: function data() {
      return {
        inputType: 'date'
      }
    }, 
    methods: {
      validate: function validate() {
        if (this.question.min && this.dataValue < this.question.min) {
          return false
        }

        if (this.question.max && this.dataValue > this.question.max) {
          return false
        }

        return !this.question.required || this.hasValue
      }
    }
  };

script$7.__file = "src/components/QuestionTypes/DateType.vue";

var script$6 = {
    extends: script$j,

    name: QuestionType.File,

    methods: {
      setAnswer: function setAnswer(answer) {
        this.question.setAnswer(this.$refs.input.files);

        this.answer = answer;
        this.question.answered = this.isValid();

        this.$emit('update:modelValue', answer);
      },

      showInvalid: function showInvalid() {
        return this.errorMessage !== null
      },

      checkFileAccept: function checkFileAccept(file) {
        var extension = '.' + file.name.split('.').pop();

        if (this.acceptedFileExtensionsRegex && this.acceptedFileExtensionsRegex.test(extension)) {
          return true
        }

        if (this.acceptedFileMimesRegex && this.acceptedFileMimesRegex.test(file.type)) {
          return true
        }

        return false
      },

      validate: function validate() {
        var this$1$1 = this;

        if (this.question.required && !this.hasValue) {
          return false
        }

        var 
          files = this.$refs.input.files,
          numFiles = files.length;

        if (this.question.accept) {
          if (!Array.from(files).every(function (file) { return this$1$1.checkFileAccept(file); })) {
            this.errorMessage = this.language.formatString(this.language.errorAllowedFileTypes, {
              fileTypes: this.question.accept
            });

            return false
          }
        }

        if (this.question.multiple) {
          if (this.question.min !== null && numFiles < +this.question.min) {
            this.errorMessage = this.language.formatString(this.language.errorMinFiles, {
              min: this.question.min
            });

            return false
          }

          if (this.question.max !== null && numFiles > +this.question.max) {
            this.errorMessage = this.language.formatString(this.language.errorMaxFiles, {
              max: this.question.max
            });

            return false
          }
        }

        if (this.question.maxSize !== null) {
          var fileSize =
            Array.from(files).reduce(function (current, file) { return current + file.size; }, 0);

          if (fileSize > +this.question.maxSize) {
            this.errorMessage = this.language.formatString(this.language.errorMaxFileSize, {
              size: this.language.formatFileSize(this.question.maxSize)
            });

            return false
          }
        }

        this.errorMessage = null;

        return this.$refs.input.checkValidity()
      }
    },

    computed: {
      acceptArray: function acceptArray() {
        if (this.question.accept) {
          return this.question.accept.split(',')
        }

        return []
      },

      acceptedFileMimes: function acceptedFileMimes() {
        return this.acceptArray.filter(function (accept) { return accept[0] !== '.'; })
      },

      acceptedFileMimesRegex: function acceptedFileMimesRegex() {
        if (this.acceptedFileMimes.length) {
          return new RegExp(this.acceptedFileMimes.join('|').replace(/\*/g, '.\*'))
        }

        return null
      },

      acceptedFileExtensions: function acceptedFileExtensions() {
        return this.acceptArray.filter(function (accept) { return accept[0] === '.'; })
      },

      acceptedFileExtensionsRegex: function acceptedFileExtensionsRegex() {
        if (this.acceptedFileExtensions.length) {
          return new RegExp(this.acceptedFileExtensions.join('|'))
        }

        return null
      }
    }
  };

var _hoisted_1$4 = ["accept", "multiple", "value", "required"];

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("input", {
    ref: "input",
    type: "file",
    accept: _ctx.question.accept,
    multiple: _ctx.question.multiple,
    value: _ctx.modelValue,
    required: _ctx.question.required,
    onKeyup: [
      _cache[0] || (_cache[0] = vue.withKeys(vue.withModifiers(function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return (_ctx.onEnter && _ctx.onEnter.apply(_ctx, args));
  }, ["prevent"]), ["enter"])),
      _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return (_ctx.onEnter && _ctx.onEnter.apply(_ctx, args));
  }, ["prevent"]), ["tab"]))
    ],
    onFocus: _cache[2] || (_cache[2] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return (_ctx.setFocus && _ctx.setFocus.apply(_ctx, args));
  }),
    onBlur: _cache[3] || (_cache[3] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return (_ctx.unsetFocus && _ctx.unsetFocus.apply(_ctx, args));
  }),
    onChange: _cache[4] || (_cache[4] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return (_ctx.onChange && _ctx.onChange.apply(_ctx, args));
  })
  }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$4))
}

script$6.render = render$4;
script$6.__file = "src/components/QuestionTypes/FileType.vue";

var script$5 = {
    extends: script$m,
    
    name: QuestionType.Matrix,

    data: function data() {
      return {
        selected: {},
        inputList: []
      }
    },

    beforeMount: function beforeMount() {
      // Pre-fill the form if there is a predefined answer
      if (this.question.multiple) {
        for (var i = 0, list = this.question.rows; i < list.length; i += 1) {
          var row = list[i];

          this.selected[row.id] = this.question.answer && this.question.answer[row.id] ? [].concat( this.question.answer[row.id] ) : [];
        }
      } else if (this.question.answer) {
        this.selected = Object.assign({}, this.question.answer);
      }
    },

    beforeUpdate: function beforeUpdate() {
      this.inputList = [];
    },

    methods: {
      onChange: function onChange($event) {
        this.dirty = true;
        this.dataValue = this.selected;
        this.onKeyDown();
        this.setAnswer(this.dataValue);
      }, 

      validate: function validate() {
        if (!this.question.required) {
          return true
        }

        var checked = function (inputs) { return inputs.some(function (input) { return input.checked; }); };

        if (!Object.values(this.inputGroups).every(function (value) { return checked(value); })) {
          return false
        }

        return true
      },

      getElement: function getElement() {
        return this.inputList[0]
      }, 
    },

    computed: {
      inputGroups: function inputGroups() {
        var inputGroups = {};

        // Setting input list for validation
        for (var i = 0, list = this.question.rows; i < list.length; i += 1) {
          var row = list[i];

          inputGroups[row.id] = [];
        }
        
        this.inputList.forEach(function (input) {
          inputGroups[input.dataset.id].push(input); 
        });

        return inputGroups
      }
    }
  };

var _hoisted_1$3 = { class: "f-matrix-wrap" };
var _hoisted_2$3 = /*#__PURE__*/vue.createElementVNode("td", null, null, -1 /* HOISTED */);
var _hoisted_3$3 = { class: "f-table-string" };
var _hoisted_4$3 = { class: "f-table-cell f-row-cell" };
var _hoisted_5$3 = { class: "f-table-string" };
var _hoisted_6$3 = ["title"];
var _hoisted_7$3 = {
  key: 0,
  class: "f-field-wrap"
};
var _hoisted_8$3 = { class: "f-matrix-field f-matrix-radio" };
var _hoisted_9$3 = ["name", "id", "aria-label", "data-id", "value", "onUpdate:modelValue"];
var _hoisted_10$3 = /*#__PURE__*/vue.createElementVNode("span", { class: "f-field-mask f-radio-mask" }, [
  /*#__PURE__*/vue.createElementVNode("svg", {
    viewBox: "0 0 24 24",
    class: "f-field-svg f-radio-svg"
  }, [
    /*#__PURE__*/vue.createElementVNode("circle", {
      r: "6",
      cx: "12",
      cy: "12"
    })
  ])
], -1 /* HOISTED */);
var _hoisted_11$3 = {
  key: 1,
  class: "f-field-wrap"
};
var _hoisted_12$3 = { class: "f-matrix-field f-matrix-checkbox" };
var _hoisted_13$3 = ["id", "aria-label", "data-id", "value", "onUpdate:modelValue"];
var _hoisted_14$2 = /*#__PURE__*/vue.createElementVNode("span", { class: "f-field-mask f-checkbox-mask" }, [
  /*#__PURE__*/vue.createElementVNode("svg", {
    viewBox: "0 0 24 24",
    class: "f-field-svg f-checkbox-svg"
  }, [
    /*#__PURE__*/vue.createElementVNode("rect", {
      width: "12",
      height: "12",
      x: "6",
      y: "6"
    })
  ])
], -1 /* HOISTED */);

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
    vue.createElementVNode("table", {
      class: vue.normalizeClass(["f-matrix-table", { 'f-matrix-multiple': _ctx.question.multiple }])
    }, [
      vue.createElementVNode("thead", null, [
        vue.createElementVNode("tr", null, [
          _hoisted_2$3,
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.question.columns, function (column, index) {
            return (vue.openBlock(), vue.createElementBlock("th", {
              key: 'c' + index,
              class: "f-table-cell f-column-cell"
            }, [
              vue.createElementVNode("span", _hoisted_3$3, vue.toDisplayString(column.label), 1 /* TEXT */)
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ]),
      vue.createElementVNode("tbody", null, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.question.rows, function (row, index) {
          return (vue.openBlock(), vue.createElementBlock("tr", {
            key: 'r' + index,
            class: "f-table-row"
          }, [
            vue.createElementVNode("td", _hoisted_4$3, [
              vue.createElementVNode("span", _hoisted_5$3, vue.toDisplayString(row.label), 1 /* TEXT */)
            ]),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.question.columns, function (column, index) {
              return (vue.openBlock(), vue.createElementBlock("td", {
                key: 'l' + index,
                title: column.label,
                class: "f-table-cell f-matrix-cell"
              }, [
                (!_ctx.question.multiple)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$3, [
                      vue.createElementVNode("label", _hoisted_8$3, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "radio",
                          ref: function (el) { return $data.inputList.push(el); },
                          name: row.id,
                          id: 'c' + index + '-' + row.id,
                          "aria-label": row.label,
                          "data-id": row.id,
                          value: column.value,
                          "onUpdate:modelValue": function ($event) { return (($data.selected[row.id]) = $event); },
                          class: "f-field-control f-radio-control",
                          onChange: _cache[0] || (_cache[0] = function () {
                            var args = [], len = arguments.length;
                            while ( len-- ) args[ len ] = arguments[ len ];

                            return ($options.onChange && $options.onChange.apply($options, args));
              })
                        }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_9$3), [
                          [vue.vModelRadio, $data.selected[row.id]]
                        ]),
                        _hoisted_10$3
                      ])
                    ]))
                  : (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$3, [
                      vue.createElementVNode("label", _hoisted_12$3, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "checkbox",
                          ref: function (el) { return $data.inputList.push(el); },
                          id: 'c' + index + '-' + row.id,
                          "aria-label": row.label,
                          "data-id": row.id,
                          value: column.value,
                          class: "f-field-control f-checkbox-control",
                          "onUpdate:modelValue": function ($event) { return (($data.selected[row.id]) = $event); },
                          onChange: _cache[1] || (_cache[1] = function () {
                            var args = [], len = arguments.length;
                            while ( len-- ) args[ len ] = arguments[ len ];

                            return ($options.onChange && $options.onChange.apply($options, args));
              })
                        }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_13$3), [
                          [vue.vModelCheckbox, $data.selected[row.id]]
                        ]),
                        _hoisted_14$2
                      ])
                    ]))
              ], 8 /* PROPS */, _hoisted_6$3))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ], 2 /* CLASS */)
  ]))
}

script$5.render = render$3;
script$5.__file = "src/components/QuestionTypes/MatrixType.vue";

var script$4 = {
    extends: script$m,
    name: QuestionType.OpinionScale,

    data: function data() {
      return {
        isIconScale: false,
        hoveredIndex: null,
        activeIndex: null
      }
    },

    mixins: [
      IsMobile
    ],

    beforeMount: function beforeMount() {
      var 
        size = this.question.max || 5,
        numOptions = Math.min(Math.max(size, 1), 10);
    
      if (!this.question.options.length) {
        for (var i = 1; i <= numOptions; i++) {
          this.question.options.push(new ChoiceOption({value: i.toString()}));
        }
      }
    },

    mounted: function mounted() {
      this.addKeyListener();
    },

    beforeUnmount: function beforeUnmount() {
      this.removeKeyListener();
    },

    watch: {
      active: function active(value) {
        if (value) {
          this.addKeyListener();
        } else {
          this.removeKeyListener();
        }
      }
    },
    
    methods: {
      addKeyListener: function addKeyListener() {
        this.removeKeyListener();
        document.addEventListener('keyup', this.onKeyListener);
      },

      removeKeyListener: function removeKeyListener() {
        document.removeEventListener('keyup', this.onKeyListener);
      },

      onMouseover: function onMouseover(index) {
        this.hoveredIndex = index;
      },

      onMouseleave: function onMouseleave() {
        this.hoveredIndex = null;
      },

      /**
       * Listens for keyboard events (1, 2, 3, ...)
       */
      onKeyListener: function onKeyListener($event) {
        if (this.active && $event.key && $event.key.length === 1) {
          var keyCode = $event.key.toUpperCase().charCodeAt(0);
     
          if (keyCode >= 48 && keyCode <= 57) {
            var index = keyCode - 49;

            if (index > -1) {
              var option = this.question.options[index];

              if (option) {
                this.toggleAnswer(option);
              } 
            }
          }
        }
      },

      getLabel: function getLabel(index) {
        return this.language.ariaMultipleChoice.replace(':letter', this.getToggleKey(index))
      },

      getToggleKey: function getToggleKey(num) {
        return num
      },

      toggleAnswer: function toggleAnswer(option) {
        for (var i = 0; i < this.question.options.length; i++) {
          var o = this.question.options[i];

          if (o.selected) {
            this._toggleAnswer(o);
          }
        }

        this._toggleAnswer(option);
      },

      _toggleAnswer: function _toggleAnswer(option) {
        var optionValue = option.choiceValue(); 

        option.toggle();

        this.activeIndex = option.selected ? this.question.options.indexOf(option) : null;
        this.dataValue = option.selected ? optionValue : null;
 
        if (this.isValid() && this.question.nextStepOnAnswer  && !this.disabled) {
          this.$emit('next');
        }

        this.setAnswer(this.dataValue);
      },

      _removeAnswer: function _removeAnswer(value) {
        var index = this.dataValue.indexOf(value);

        if (index !== -1) {
          this.dataValue.splice(index, 1);
        }
      },

      iconScaleClasses: function iconScaleClasses(index) {
        var classes = {};

        if (this.isIconScale) {
          if (!this.isMobile) {
            classes['f-hovered'] = this.hoveredIndex && index < this.hoveredIndex;
          }

          classes['f-previous'] = this.activeIndex && index < this.activeIndex;
        }

        return classes
      }
    },

    computed: {
      hasValue: function hasValue() {
        if (this.question.options.filter(function (o) { return o.selected; }).length) {
          return true
        }

        return false
      }
    }
  };

var _hoisted_1$2 = { class: "f-radios-wrap" };
var _hoisted_2$2 = {
  class: "f-radios",
  role: "listbox"
};
var _hoisted_3$2 = ["onClick", "onMouseover", "aria-label"];
var _hoisted_4$2 = {
  key: 0,
  class: "f-label-wrap"
};
var _hoisted_5$2 = {
  key: 0,
  class: "f-label"
};
var _hoisted_6$2 = {
  key: 1,
  class: "f-icon-wrap"
};
var _hoisted_7$2 = /*#__PURE__*/vue.createElementVNode("div", { class: "f-icon" }, [
  /*#__PURE__*/vue.createElementVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, [
    /*#__PURE__*/vue.createElementVNode("path", {
      d: "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z",
      "stroke-width": ".5"
    })
  ])
], -1 /* HOISTED */);
var _hoisted_8$2 = { class: "f-key" };
var _hoisted_9$2 = {
  key: 0,
  class: "f-label-scale-wrap"
};
var _hoisted_10$2 = {
  key: 0,
  class: "f-label-scale"
};
var _hoisted_11$2 = /*#__PURE__*/vue.createElementVNode("span", { class: "f-label-scale-num" }, "1 - ", -1 /* HOISTED */);
var _hoisted_12$2 = {
  key: 1,
  class: "f-label-scale"
};
var _hoisted_13$2 = { class: "f-label-scale-num" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
    vue.createElementVNode("ul", _hoisted_2$2, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.question.options, function (option, index) {
        return (vue.openBlock(), vue.createElementBlock("li", {
          onClick: vue.withModifiers(function ($event) { return ($options.toggleAnswer(option)); }, ["prevent"]),
          onMouseover: function ($event) { return ($data.isIconScale && $options.onMouseover(index)); },
          onMouseleave: _cache[0] || (_cache[0] = function ($event) { return ($data.isIconScale && $options.onMouseleave()); }),
          class: vue.normalizeClass(Object.assign({}, {'f-selected': option.selected}, $options.iconScaleClasses(index))),
          key: 'm' + index,
          "aria-label": $options.getLabel(option.value),
          role: "option"
        }, [
          (!$data.isIconScale)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$2, [
                (option.choiceLabel())
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$2, vue.toDisplayString(option.choiceLabel()), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$2, [
                _hoisted_7$2,
                vue.createElementVNode("div", _hoisted_8$2, vue.toDisplayString($options.getToggleKey(option.value)), 1 /* TEXT */)
              ]))
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_3$2))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    (!$data.isIconScale && (_ctx.question.labelLeft || _ctx.question.labelRight))
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$2, [
          (_ctx.question.labelLeft)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10$2, [
                _hoisted_11$2,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.question.labelLeft), 1 /* TEXT */)
              ]))
            : vue.createCommentVNode("v-if", true),
          (_ctx.question.labelRight)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_12$2, [
                vue.createElementVNode("span", _hoisted_13$2, vue.toDisplayString(_ctx.question.options.length) + " - ", 1 /* TEXT */),
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.question.labelRight), 1 /* TEXT */)
              ]))
            : vue.createCommentVNode("v-if", true)
        ]))
      : vue.createCommentVNode("v-if", true)
  ]))
}

script$4.render = render$2;
script$4.__file = "src/components/QuestionTypes/OpinionScaleType.vue";

var script$3 = {
    extends: script$4,
    name: QuestionType.IconRate,

    data: function data() {
      return {
        isIconScale: true
      }
    },
  };

script$3.__file = "src/components/QuestionTypes/IconRateType.vue";

var script$2 = {
    name: 'FlowFormQuestion',

    components: {
      FlowFormDateType: script$7,
      FlowFormDropdownType: script$l,
      FlowFormEmailType: script$i,
      FlowFormLongTextType: script$g,
      FlowFormMultipleChoiceType: script$f,
      FlowFormMultiplePictureChoiceType: script$e,
      FlowFormMultipleTextType: script$d,
      FlowFormNumberType: script$c,
      FlowFormPasswordType: script$b,
      FlowFormPhoneType: script$a,
      FlowFormSectionBreakType: script$9,
      FlowFormTextType: script$j,
      FlowFormFileType: script$6,
      FlowFormUrlType: script$8,
      FlowFormMatrixType: script$5,
      FlowFormOpinionScaleType: script$4,
      FlowFormIconRateType: script$3,
    },

    props: {
      question: QuestionModel,
      language: LanguageModel,
      value: [String, Array, Boolean, Number, Object],
      active: {
        type: Boolean,
        default: false
      },
      reverse: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: true
      }
    },

    mixins: [
      IsMobile
    ],

    data: function data() {
      return {
        QuestionType: QuestionType,
        dataValue: null,
        debounced: false
      }
    },

    mounted: function mounted() {
      this.autofocus && this.focusField();

      this.dataValue = this.question.answer;

      this.$refs.qanimate.addEventListener('animationend', this.onAnimationEnd);
    },

    beforeUnmount: function beforeUnmount() {
      this.$refs.qanimate.removeEventListener('animationend', this.onAnimationEnd);
    },

    methods: {
      /**
       * Autofocus the input box of the current question
       */
      focusField: function focusField() {
        var el = this.$refs.questionComponent;
        
        el && el.focus();
      },

      onAnimationEnd: function onAnimationEnd() {
        this.autofocus && this.focusField();
      },

      shouldFocus: function shouldFocus() {
        var q = this.$refs.questionComponent;

        return q && q.canReceiveFocus && !q.focused
      },

      returnFocus: function returnFocus() {
        this.$refs.questionComponent;

        if (this.shouldFocus()) {
          this.focusField();
        }
      },

      /**
       * Emits "answer" event and calls "onEnter" method on Enter press
       */ 
      onEnter: function onEnter($event) {
        this.checkAnswer(this.emitAnswer);
      },

      onTab: function onTab($event) {
        this.checkAnswer(this.emitAnswerTab);
      },

      checkAnswer: function checkAnswer(fn) {
        var this$1$1 = this;

        var q = this.$refs.questionComponent;

        if (q.isValid() && this.question.isMultipleChoiceType() && this.question.nextStepOnAnswer &&  !this.question.multiple) {
          this.$emit('disable', true);

          this.debounce(function () {
            fn(q);
            this$1$1.$emit('disable', false);
          }, 350);
        } else {
          fn(q);
        }
      },

      emitAnswer: function emitAnswer(q) {
        if (q) {
          if (!q.focused) {
            this.$emit('answer', q);
          }

          q.onEnter();
        }
      },

      emitAnswerTab: function emitAnswerTab(q) {
        if (q && this.question.type !== QuestionType.Date) {
          this.returnFocus();
          this.$emit('answer', q);
          
          q.onEnter();
        }
      },

      debounce: function debounce(fn, delay) {
        var debounceTimer;
        this.debounced = true;
      
        return (function () {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(fn, delay);
        })()
      },
      
      /**
       * Check if the "OK" button should be shown.
       */
      showOkButton: function showOkButton() {
        var q = this.$refs.questionComponent;

        if (this.question.type === QuestionType.SectionBreak) {
          return this.active
        }

        if (!this.question.required) {
          return true
        }

        if (this.question.allowOther && this.question.other) {
          return true
        }

        if (this.question.isMultipleChoiceType() && !this.question.multiple && this.question.nextStepOnAnswer) {
          return false
        }
      
        // If there is no question referenced, or dataValue is still set to its default (null).
        // This allows a ChoiceOption value of false, but will not allow you to use null as a value.
        if (!q || this.dataValue === null) {
          return false
        }

        return q.hasValue && q.isValid()
      },

      showSkip: function showSkip() {
        var q = this.$refs.questionComponent;

        // We might not have a reference to the question component at first
        // but we know that if we don't, it's definitely empty
        return !this.question.required && (!q || !q.hasValue)
      },

      /**
       * Determins if the invalid message should be shown.
       */
      showInvalid: function showInvalid() {
        var q = this.$refs.questionComponent;

        if (!q || this.dataValue === null) {
          return false
        }

        return q.showInvalid()
      }
    },

    computed: {
      mainClasses: {
        cache: false,
        get: function get() {
          var classes = {
            'q-is-active': this.active,
            'q-is-inactive': !this.active,
            'f-fade-in-down': this.reverse,
            'f-fade-in-up': !this.reverse,
            'f-focused': this.$refs.questionComponent && this.$refs.questionComponent.focused,
            'f-has-value': this.$refs.questionComponent && this.$refs.questionComponent.hasValue
          };

          classes['field-' + this.question.type.toLowerCase().substring(8, this.question.type.length - 4)] = true;

          return classes
        }
      },

      showHelperText: function showHelperText() {
        if (this.question.subtitle) {
          return true
        }

        if (this.question.type === QuestionType.LongText || this.question.type === QuestionType.MultipleChoice) {
          return this.question.helpTextShow
        }

        return false
      },

      errorMessage: function errorMessage() {
        var q = this.$refs.questionComponent;

        if (q && q.errorMessage) {
          return q.errorMessage
        }

        return this.language.invalidPrompt
      }
    }
  };

var _hoisted_1$1 = { class: "q-inner" };
var _hoisted_2$1 = {
  key: 0,
  class: "f-tagline"
};
var _hoisted_3$1 = {
  key: 0,
  class: "fh2"
};
var _hoisted_4$1 = {
  key: 1,
  class: "f-text"
};
var _hoisted_5$1 = ["aria-label"];
var _hoisted_6$1 = /*#__PURE__*/vue.createElementVNode("span", { "aria-hidden": "true" }, "*", -1 /* HOISTED */);
var _hoisted_7$1 = [
  _hoisted_6$1
];
var _hoisted_8$1 = {
  key: 1,
  class: "f-answer"
};
var _hoisted_9$1 = {
  key: 2,
  class: "f-sub"
};
var _hoisted_10$1 = { key: 0 };
var _hoisted_11$1 = ["innerHTML"];
var _hoisted_12$1 = {
  key: 2,
  class: "f-help"
};
var _hoisted_13$1 = {
  key: 3,
  class: "f-help"
};
var _hoisted_14$1 = {
  key: 3,
  class: "f-answer f-full-width"
};
var _hoisted_15$1 = {
  key: 0,
  class: "f-description"
};
var _hoisted_16$1 = { key: 0 };
var _hoisted_17$1 = ["href", "target"];
var _hoisted_18$1 = {
  key: 0,
  class: "vff-animate f-fade-in f-enter"
};
var _hoisted_19$1 = ["aria-label"];
var _hoisted_20 = { key: 0 };
var _hoisted_21 = { key: 1 };
var _hoisted_22 = { key: 2 };
var _hoisted_23 = ["innerHTML"];
var _hoisted_24 = {
  key: 1,
  class: "f-invalid",
  role: "alert",
  "aria-live": "assertive"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["vff-animate q-form", $options.mainClasses]),
    ref: "qanimate"
  }, [
    vue.createElementVNode("div", _hoisted_1$1, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass({'f-section-wrap': $props.question.type === $data.QuestionType.SectionBreak})
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass({'fh2': $props.question.type !== $data.QuestionType.SectionBreak})
        }, [
          ($props.question.tagline)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$1, vue.toDisplayString($props.question.tagline), 1 /* TEXT */))
            : vue.createCommentVNode("v-if", true),
          ($props.question.title)
            ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                ($props.question.type === $data.QuestionType.SectionBreak)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$1, vue.toDisplayString($props.question.title), 1 /* TEXT */))
                  : (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$1, [
                      vue.createTextVNode(vue.toDisplayString($props.question.title) + "  ", 1 /* TEXT */),
                      vue.createCommentVNode(" Required questions are marked by an asterisk (*) "),
                      ($props.question.required)
                        ? (vue.openBlock(), vue.createElementBlock("span", {
                            key: 0,
                            class: "f-required",
                            "aria-label": $props.language.ariaRequired,
                            role: "note"
                          }, _hoisted_7$1, 8 /* PROPS */, _hoisted_5$1))
                        : vue.createCommentVNode("v-if", true),
                      ($props.question.inline)
                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8$1, [
                            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.question.type), {
                              ref: "questionComponent",
                              question: $props.question,
                              language: $props.language,
                              modelValue: $data.dataValue,
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) { return (($data.dataValue) = $event); }),
                              active: $props.active,
                              disabled: $props.disabled,
                              onNext: $options.onEnter
                            }, null, 8 /* PROPS */, ["question", "language", "modelValue", "active", "disabled", "onNext"]))
                          ]))
                        : vue.createCommentVNode("v-if", true)
                    ]))
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : vue.createCommentVNode("v-if", true),
          ($options.showHelperText)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9$1, [
                ($props.question.subtitle)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10$1, vue.toDisplayString($props.question.subtitle), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true),
                ($props.question.type === $data.QuestionType.LongText && !_ctx.isMobile)
                  ? (vue.openBlock(), vue.createElementBlock("span", {
                      key: 1,
                      class: "f-help",
                      innerHTML: $props.question.helpText || $props.language.formatString($props.language.longTextHelpText)
                    }, null, 8 /* PROPS */, _hoisted_11$1))
                  : vue.createCommentVNode("v-if", true),
                ($props.question.type === $data.QuestionType.MultipleChoice && $props.question.multiple)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_12$1, vue.toDisplayString($props.question.helpText || $props.language.multipleChoiceHelpText), 1 /* TEXT */))
                  : ($props.question.type === $data.QuestionType.MultipleChoice)
                    ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_13$1, vue.toDisplayString($props.question.helpText || $props.language.multipleChoiceHelpTextSingle), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true),
          (!$props.question.inline)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14$1, [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.question.type), {
                  ref: "questionComponent",
                  question: $props.question,
                  language: $props.language,
                  modelValue: $data.dataValue,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($data.dataValue) = $event); }),
                  active: $props.active,
                  disabled: $props.disabled,
                  onNext: $options.onEnter
                }, null, 8 /* PROPS */, ["question", "language", "modelValue", "active", "disabled", "onNext"]))
              ]))
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */),
        ($props.question.description || $props.question.descriptionLink.length !== 0)
          ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_15$1, [
              ($props.question.description)
                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_16$1, vue.toDisplayString($props.question.description), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.question.descriptionLink, function (link, index) {
                return (vue.openBlock(), vue.createElementBlock("a", {
                  class: "f-link",
                  key: 'm' + index,
                  href: link.url,
                  target: link.target
                }, vue.toDisplayString(link.text || link.url), 9 /* TEXT, PROPS */, _hoisted_17$1))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          : vue.createCommentVNode("v-if", true)
      ], 2 /* CLASS */),
      ($options.showOkButton())
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_18$1, [
            vue.createElementVNode("button", {
              class: "o-btn-action",
              type: "button",
              ref: "button",
              href: "#",
              onClick: _cache[2] || (_cache[2] = vue.withModifiers(function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.onEnter && $options.onEnter.apply($options, args));
  }, ["prevent"])),
              "aria-label": $props.language.ariaOk
            }, [
              ($props.question.type === $data.QuestionType.SectionBreak)
                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_20, vue.toDisplayString($props.language.continue), 1 /* TEXT */))
                : ($options.showSkip())
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_21, vue.toDisplayString($props.language.skip), 1 /* TEXT */))
                  : (vue.openBlock(), vue.createElementBlock("span", _hoisted_22, vue.toDisplayString($props.language.ok), 1 /* TEXT */))
            ], 8 /* PROPS */, _hoisted_19$1),
            ($props.question.type !== $data.QuestionType.LongText || !_ctx.isMobile)
              ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  class: "f-enter-desc",
                  href: "#",
                  onClick: _cache[3] || (_cache[3] = vue.withModifiers(function () {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    return ($options.onEnter && $options.onEnter.apply($options, args));
  }, ["prevent"])),
                  innerHTML: $props.language.formatString($props.language.pressEnter)
                }, null, 8 /* PROPS */, _hoisted_23))
              : vue.createCommentVNode("v-if", true)
          ]))
        : vue.createCommentVNode("v-if", true),
      ($options.showInvalid())
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_24, vue.toDisplayString($options.errorMessage), 1 /* TEXT */))
        : vue.createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}

script$2.render = render$1;
script$2.__file = "src/components/FlowFormQuestion.vue";

/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

var instances = {};

var ComponentInstance = {
  methods: {
    getInstance: function getInstance(id) {
      return instances[id]
    },

    setInstance: function setInstance() {
      instances[this.id] = this;
    }
  }
};

var script$1 = {
    name: 'FlowForm',

    components: {
      FlowFormQuestion: script$2
    },
    
    props: {
      questions: {
        type: Array,
        validator: function (value) { return value.every(function (q) { return q instanceof QuestionModel; }); }
      }, 
      language: {
        type: LanguageModel,
        default: function () { return new LanguageModel(); }
      },
      progressbar: {
        type: Boolean, 
        default: true
      },
      standalone: {
        type: Boolean, 
        default: true
      },
      navigation: {
        type: Boolean, 
        default: true
      },
      timer: {
        type: Boolean,
        default: false
      },
      timerStartStep: [String, Number],
      timerStopStep: [String, Number],
      autofocus: {
        type: Boolean,
        default: true
      }
    },

    mixins: [
      IsMobile,
      ComponentInstance
    ],

    data: function data() {
      return {
        questionRefs: [],
        completed: false,
        submitted: false,
        activeQuestionIndex: 0,
        questionList: [],
        questionListActivePath: [],
        reverse: false,
        timerOn: false,
        timerInterval: null,
        time: 0,
        disabled: false
      }
    },

    mounted: function mounted() {
      document.addEventListener('keydown', this.onKeyDownListener);
      document.addEventListener('keyup', this.onKeyUpListener, true);
      window.addEventListener('beforeunload', this.onBeforeUnload);

      this.setQuestions();
      this.checkTimer();
    },

    beforeUnmount: function beforeUnmount() {
      document.removeEventListener('keydown', this.onKeyDownListener);
      document.removeEventListener('keyup', this.onKeyUpListener, true);
      window.removeEventListener('beforeunload', this.onBeforeUnload);
      
      this.stopTimer();
    },

    beforeUpdate: function beforeUpdate() {
      this.questionRefs = [];
    },
    
    computed: {
      numActiveQuestions: function numActiveQuestions() {
        return this.questionListActivePath.length
      },

      activeQuestion: function activeQuestion() {
        return this.questionListActivePath[this.activeQuestionIndex]
      },

      activeQuestionId: function activeQuestionId() {
        var question = this.questionModels[this.activeQuestionIndex];

        if (this.isOnLastStep) {
          return '_submit'
        }

        if (question && question.id) {
          return question.id
        }

        return null
      },

      numCompletedQuestions: function numCompletedQuestions() {
        var num = 0;

        this.questionListActivePath.forEach(function (question) {
          if (question.answered) {
            ++num;
          }
        });

        return num
      },

      percentCompleted: function percentCompleted() {
        if (!this.numActiveQuestions) {
          return 0
        }

        return Math.floor((this.numCompletedQuestions / this.numActiveQuestions) * 100)
      },

      isOnLastStep: function isOnLastStep() {
        return this.numActiveQuestions > 0 && this.activeQuestionIndex === this.questionListActivePath.length
      }, 

      isOnTimerStartStep: function isOnTimerStartStep() {
        if (this.activeQuestionId === this.timerStartStep) {
          return true
        }

        if (!this.timerOn && !this.timerStartStep && this.activeQuestionIndex === 0) {
          return true
        }

        return false
      },

      isOnTimerStopStep: function isOnTimerStopStep() {
        if (this.submitted) {
          return true
        }
        
        if (this.activeQuestionId === this.timerStopStep) {
          return true 
        }

        return false
      },

      questionModels: {
        cache: false,

        get: function get() {
          var this$1$1 = this;

          if (this.questions && this.questions.length) {
            return this.questions
          }

          var questions = [];

          if (!this.questions) {
            var classMap = {
              options: ChoiceOption,
              descriptionLink: LinkOption
            };

            var defaultSlot = this.$slots.default();
            var children = null;

            if (defaultSlot && defaultSlot.length) {
              children = defaultSlot[0].children;
              if (!children) {
                children = defaultSlot;
              } 
            }

            if (children) {
              children
                .filter(function (q) { return q.type && q.type.name.indexOf('Question') !== -1; })
                .forEach(function (q) {
                  var props = q.props;
                  var componentInstance = this$1$1.getInstance(props.id);
                  var model = new QuestionModel();

                  if (componentInstance.question !== null) {
                    model = componentInstance.question;
                  } 

                  if (props.modelValue) {
                    model.answer = props.modelValue;
                  }

                  Object.keys(model).forEach(function (key) {
                    if (props[key] !== undefined) {
                      if (typeof model[key] === 'boolean') {
                        model[key] = props[key] !== false;
                      } else if (key in classMap) {
                        var
                          classReference = classMap[key],
                          options = [];

                        props[key].forEach(function (option) {
                          var instance = new classReference();

                          Object.keys(instance).forEach(function (instanceKey) {
                            if (option[instanceKey] !== undefined) {
                              instance[instanceKey] = option[instanceKey];
                            }
                          });

                          options.push(instance);
                        });

                        model[key] = options;
                      } else {
                        switch(key) {
                          case 'type':
                            if (Object.values(QuestionType).indexOf(props[key]) !== -1) {
                              model[key] = props[key];
                            } else {
                              for (var questionTypeKey in QuestionType) {
                                if (questionTypeKey.toLowerCase() === props[key].toLowerCase()) {
                                  model[key] = QuestionType[questionTypeKey];
                                  break
                                }
                              }
                            }
                            break

                          default:
                            model[key] = props[key];
                            break
                        }
                      }
                    }
                  });

                  componentInstance.question = model;

                  model.resetOptions();

                  questions.push(model);
                });
            }
          }

          return questions
        }
      }
    },

    methods: {
      setQuestionRef: function setQuestionRef(el) {
        this.questionRefs.push(el);
      },

      /**
       * Returns currently active question component (if any).
       */
      activeQuestionComponent: function activeQuestionComponent() {
        return this.questionRefs[this.activeQuestionIndex]
      },

      setQuestions: function setQuestions() {
        this.setQuestionListActivePath();
        this.setQuestionList();
      },

      /**
       * This method goes through all questions and sets the ones
       * that are in the current path (taking note of logic jumps)
       */
      setQuestionListActivePath: function setQuestionListActivePath() {
        var this$1$1 = this;

        var questions = [];

        if (!this.questionModels.length) {
          return
        }

        var
          index = 0,
          serialIndex = 0,
          nextId,
          activeIndex = this.activeQuestionIndex;

        var loop = function () {
          var question = this$1$1.questionModels[index];

          if (questions.some(function (q) { return q === question; })) {
            return 'break'
          }
          
          question.setIndex(serialIndex);
          question.language = this$1$1.language;

          questions.push(question);

          if (!question.jump) {
            ++index;
          } else if (question.answered) {
            nextId = question.getJumpId();
            
            if (nextId) {
              if (nextId === '_submit') {
                index = this$1$1.questionModels.length;
              } else {
                var loop$1 = function ( i ) {
                  if (this$1$1.questionModels[i].id === nextId) {
                    if (i < index && questions.some(function (q) { return q === this$1$1.questionModels[i]; })) {
                      question.answered = false;
                      activeIndex = i;
                      ++index;
                    } else {
                      index = i;
                    }
                    return 'break'
                  }
                };

                for (var i = 0; i < this$1$1.questionModels.length; i++) {
                  var returned$1 = loop$1( i );

                  if ( returned$1 === 'break' ) break;
                }
              }
            } else {
              ++index;
            }
          } else {
            index = this$1$1.questionModels.length;
          }

          ++serialIndex;
        };

        do {
          var returned = loop();

          if ( returned === 'break' ) break;
        } while (index < this$1$1.questionModels.length)

        this.questionListActivePath = questions;
        this.goToQuestion(activeIndex);
      },

      /**
       * Sets the question list array
       * (all questions up to, and including, the current one)
       */
      setQuestionList: function setQuestionList() {
        var questions = [];

        for (var index = 0; index < this.questionListActivePath.length; index++) {
          var question = this.questionListActivePath[index];

          questions.push(question);

          if (!question.answered) {
            if (this.completed) {
              // The "completed" status changed - user probably changed an
              // already entered answer.
              this.completed = false;
            }
            break
          }
        }

        this.questionList = questions;
      },

      /**
       * If we have any answered questions, notify user before leaving
       * the page.
       */
      onBeforeUnload: function onBeforeUnload(event) {
        if (this.activeQuestionIndex > 0 && !this.submitted) {
          event.preventDefault();
          event.returnValue = '';
        }
      },

      /**
       * Global key listeners, listen for Enter or Tab key events.
       */
      onKeyDownListener: function onKeyDownListener(e) {
        if (e.key !== 'Tab' || this.submitted) {
          return
        }

        if (e.shiftKey) {
          e.stopPropagation();
          e.preventDefault();

          if (this.navigation) {
            this.goToPreviousQuestion();
          }
        } else {
          var q = this.activeQuestionComponent();

          if (q.shouldFocus()) {
            e.preventDefault();

            q.focusField();
          } else {
            e.stopPropagation();

            this.emitTab();
            this.reverse = false;
          }
        }
      }, 

      onKeyUpListener: function onKeyUpListener(e) {
        if (e.shiftKey || ['Tab', 'Enter'].indexOf(e.key) === -1 || this.submitted) {
          return
        }

        var q = this.activeQuestionComponent();

        if (e.key === 'Tab' && q.shouldFocus()) {
          q.focusField();
        } else {
          if (e.key === 'Enter') {
            this.emitEnter();
          } 

          e.stopPropagation();
          this.reverse = false;
        }
      },

      emitEnter: function emitEnter() {
        if (this.disabled) {
          return
        }

        var q = this.activeQuestionComponent();

        if (q) {
          // Send enter event to the current question component
          q.onEnter();
        } else if (this.completed && this.isOnLastStep) {
          // We're finished - submit form
          this.submit();
        }
      },

      emitTab: function emitTab() {
        var q = this.activeQuestionComponent();

        if (q) {
          // Send tab event to the current question component
          q.onTab();
        } else {
          this.emitEnter();
        }
      },

      submit: function submit() {
        this.emitSubmit();
        this.submitted = true;
      },

      emitComplete: function emitComplete() {
        this.$emit('complete', this.completed, this.questionList);
      },

      emitSubmit: function emitSubmit() {
        this.$emit('submit', this.questionList);
      },

      /**
       * Checks if we have another question and if we
       * can jump to it.
       */
      isNextQuestionAvailable: function isNextQuestionAvailable() {
        if (this.submitted) {
          return false
        }

        var q = this.activeQuestion;
        if (q && !q.required) {
          return true
        }

        if (this.completed && !this.isOnLastStep) {
          return true
        }
   
        return this.activeQuestionIndex < this.questionList.length - 1
      },

      /**
       * Triggered by the "answer" event in the Question component
       */
      onQuestionAnswered: function onQuestionAnswered(question) {
        var this$1$1 = this;

        if (question.isValid()) {
          this.$emit('answer', question.question);

          if (this.activeQuestionIndex < this.questionListActivePath.length) {
            ++this.activeQuestionIndex;
          }
         
          this.$nextTick(function () {
            this$1$1.reverse = false;

            this$1$1.setQuestions();
            this$1$1.checkTimer();
            // Nested $nextTick so we're 100% sure that setQuestions
            // actually updated the question array
            this$1$1.$nextTick(function () {
              var q = this$1$1.activeQuestionComponent();

              if (q) {
                this$1$1.autofocus && q.focusField();
                this$1$1.activeQuestionIndex = q.question.index;
              } else if (this$1$1.isOnLastStep) {
                // No more questions left - set "completed" to true
                this$1$1.completed = true;
                this$1$1.activeQuestionIndex = this$1$1.questionListActivePath.length;
                
                this$1$1.$refs.button && this$1$1.$refs.button.focus();
              }

              this$1$1.$emit('step', this$1$1.activeQuestionId, this$1$1.activeQuestion);
            });
          });
        } else if (this.completed) {
          this.completed = false;
        }
      },

      /**
       * Jumps to previous question.
       */
      goToPreviousQuestion: function goToPreviousQuestion() {
        this.blurFocus();
    
        if (this.activeQuestionIndex > 0 && !this.submitted) {
          if (this.isOnTimerStopStep) {
            this.startTimer();
          }

          --this.activeQuestionIndex;

          this.reverse = true;

          this.checkTimer();
        }
      },

      /**
       * Jumps to next question.
       */
      goToNextQuestion: function goToNextQuestion() {
        this.blurFocus();

        if (this.isNextQuestionAvailable()) {
          this.emitEnter();
        }

        this.reverse = false;
      },

      /**
       * Jumps to question with specific index.
       */
      goToQuestion: function goToQuestion(index) {
        if (isNaN(+index)) {
          var questionIndex = this.activeQuestionIndex;

          this.questionListActivePath.forEach(function (question, _index) {
            if (question.id === index) {
              questionIndex = _index;
            }
          });

          index = questionIndex;
        }

        if (index !== this.activeQuestionIndex) {
          this.blurFocus();
      
          if (!this.submitted && index <= this.questionListActivePath.length - 1) {
            // Check if we can actually jump to the wanted question.
            do {
              var previousQuestionsAnswered = 
                this
                  .questionListActivePath
                  .slice(0, index)
                  .every(function (q) { return q.answered; });

              if (previousQuestionsAnswered) {
                break
              }

              --index;
            } while (index > 0)

            this.reverse = index < this.activeQuestionIndex;
            this.activeQuestionIndex = index;

            this.checkTimer();
          }
        }
      },

      /**
       * Removes focus from the currently focused DOM element.
       */
      blurFocus: function blurFocus() {
        document.activeElement && document.activeElement.blur && document.activeElement.blur();
      },

      checkTimer: function checkTimer() {
        if (this.timer) {
          if (this.isOnTimerStartStep) {
            this.startTimer();
          } else if (this.isOnTimerStopStep) {
            this.stopTimer();
          }
        }
      },

      startTimer: function startTimer() {
        if (this.timer && !this.timerOn) {
          this.timerInterval = setInterval(this.incrementTime, 1000);
          this.timerOn = true;
        }
      },

      stopTimer: function stopTimer() {
        if (this.timerOn) {
          clearInterval(this.timerInterval);
        }

        this.timerOn = false;
      },

      incrementTime: function incrementTime() {
        ++this.time;
        
        this.$emit('timer', this.time, this.formatTime(this.time));
      },

      formatTime: function formatTime(seconds) {
        var
          startIndex = 14,
          length = 5;
            
        if (seconds >= 60 * 60) {
          startIndex = 11;
          length = 8;
        }

        return new Date(1000 * seconds).toISOString().substr(startIndex, length)
      },

      setDisabled: function setDisabled(state) {
        this.disabled = state;
      },

      reset: function reset() {
        this.questionModels.forEach(function (question) { return question.resetAnswer(); });
        this.goToQuestion(0);
      }
    },

    watch: {
      completed: function completed() {
        this.emitComplete();
      },
      
      submitted: function submitted() {
        this.stopTimer();
      }
    }
  };

var _hoisted_1 = { class: "f-container" };
var _hoisted_2 = { class: "f-form-wrap" };
var _hoisted_3 = {
  key: 0,
  class: "vff-animate f-fade-in-up field-submittype"
};
var _hoisted_4 = { class: "f-section-wrap" };
var _hoisted_5 = { class: "fh2" };
var _hoisted_6 = ["aria-label"];
var _hoisted_7 = ["innerHTML"];
var _hoisted_8 = {
  key: 2,
  class: "text-success"
};
var _hoisted_9 = { class: "vff-footer" };
var _hoisted_10 = { class: "footer-inner-wrap" };
var _hoisted_11 = { class: "f-progress-bar" };
var _hoisted_12 = {
  key: 1,
  class: "f-nav"
};
var _hoisted_13 = ["aria-label"];
var _hoisted_14 = /*#__PURE__*/vue.createElementVNode("svg", {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  width: "42.333px",
  height: "28.334px",
  viewBox: "78.833 5.5 42.333 28.334",
  "aria-hidden": "true"
}, [
  /*#__PURE__*/vue.createElementVNode("path", { d: "M82.039,31.971L100,11.442l17.959,20.529L120,30.187L101.02,8.492c-0.258-0.295-0.629-0.463-1.02-0.463c-0.39,0-0.764,0.168-1.02,0.463L80,30.187L82.039,31.971z" })
], -1 /* HOISTED */);
var _hoisted_15 = {
  class: "f-nav-text",
  "aria-hidden": "true"
};
var _hoisted_16 = ["aria-label"];
var _hoisted_17 = /*#__PURE__*/vue.createElementVNode("svg", {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  width: "42.333px",
  height: "28.334px",
  viewBox: "78.833 5.5 42.333 28.334",
  "aria-hidden": "true"
}, [
  /*#__PURE__*/vue.createElementVNode("path", { d: "M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z" })
], -1 /* HOISTED */);
var _hoisted_18 = {
  class: "f-nav-text",
  "aria-hidden": "true"
};
var _hoisted_19 = {
  key: 2,
  class: "f-timer"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_flow_form_question = vue.resolveComponent("flow-form-question");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["vff", {'vff-not-standalone': !$props.standalone, 'vff-is-mobile': _ctx.isMobile, 'vff-is-ios': _ctx.isIos}])
  }, [
    vue.createElementVNode("div", _hoisted_1, [
      vue.createElementVNode("div", _hoisted_2, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.questionList, function (q, index) {
          return (vue.openBlock(), vue.createBlock(_component_flow_form_question, {
            ref: $options.setQuestionRef,
            question: q,
            language: $props.language,
            key: 'q' + index,
            active: q.index === $data.activeQuestionIndex,
            modelValue: q.answer,
            "onUpdate:modelValue": function ($event) { return ((q.answer) = $event); },
            onAnswer: $options.onQuestionAnswered,
            reverse: $data.reverse,
            disabled: $data.disabled,
            onDisable: $options.setDisabled,
            autofocus: $props.autofocus
          }, null, 8 /* PROPS */, ["question", "language", "active", "modelValue", "onUpdate:modelValue", "onAnswer", "reverse", "disabled", "onDisable", "autofocus"]))
        }), 128 /* KEYED_FRAGMENT */)),
        vue.renderSlot(_ctx.$slots, "default"),
        vue.createCommentVNode(" Complete/Submit screen slots "),
        ($options.isOnLastStep)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
              vue.renderSlot(_ctx.$slots, "complete", {}, function () { return [
                vue.createCommentVNode(" Default content for the \"complete\" slot "),
                vue.createElementVNode("div", _hoisted_4, [
                  vue.createElementVNode("p", null, [
                    vue.createElementVNode("span", _hoisted_5, vue.toDisplayString($props.language.thankYouText), 1 /* TEXT */)
                  ])
                ])
              ]; }),
              vue.renderSlot(_ctx.$slots, "completeButton", {}, function () { return [
                vue.createCommentVNode(" Default content for the \"completeButton\" slot "),
                (!$data.submitted)
                  ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 0,
                      class: "o-btn-action",
                      ref: "button",
                      type: "button",
                      href: "#",
                      onClick: _cache[0] || (_cache[0] = vue.withModifiers(function ($event) { return ($options.submit()); }, ["prevent"])),
                      "aria-label": $props.language.ariaSubmitText
                    }, [
                      vue.createElementVNode("span", null, vue.toDisplayString($props.language.submitText), 1 /* TEXT */)
                    ], 8 /* PROPS */, _hoisted_6))
                  : vue.createCommentVNode("v-if", true),
                (!$data.submitted)
                  ? (vue.openBlock(), vue.createElementBlock("a", {
                      key: 1,
                      class: "f-enter-desc",
                      href: "#",
                      onClick: _cache[1] || (_cache[1] = vue.withModifiers(function ($event) { return ($options.submit()); }, ["prevent"])),
                      innerHTML: $props.language.formatString($props.language.pressEnter)
                    }, null, 8 /* PROPS */, _hoisted_7))
                  : vue.createCommentVNode("v-if", true),
                ($data.submitted)
                  ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_8, vue.toDisplayString($props.language.successText), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ]; })
            ]))
          : vue.createCommentVNode("v-if", true)
      ])
    ]),
    vue.createElementVNode("div", _hoisted_9, [
      vue.createElementVNode("div", _hoisted_10, [
        ($props.progressbar)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(["f-progress", {'not-started': $options.percentCompleted === 0, 'completed': $options.percentCompleted === 100}])
            }, [
              vue.createElementVNode("div", _hoisted_11, [
                vue.createElementVNode("div", {
                  class: "f-progress-bar-inner",
                  style: vue.normalizeStyle('width: ' + $options.percentCompleted + '%;')
                }, null, 4 /* STYLE */)
              ]),
              vue.createTextVNode(" " + vue.toDisplayString($props.language.percentCompleted.replace(':percent', $options.percentCompleted)), 1 /* TEXT */)
            ], 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true),
        ($props.navigation)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, [
              vue.createElementVNode("a", {
                class: vue.normalizeClass(["f-prev", {'f-disabled': $data.activeQuestionIndex === 0 || $data.submitted}]),
                href: "#",
                onClick: _cache[2] || (_cache[2] = vue.withModifiers(function ($event) { return ($options.goToPreviousQuestion()); }, ["prevent"])),
                role: "button",
                "aria-label": $props.language.ariaPrev
              }, [
                _hoisted_14,
                vue.createElementVNode("span", _hoisted_15, vue.toDisplayString($props.language.prev), 1 /* TEXT */)
              ], 10 /* CLASS, PROPS */, _hoisted_13),
              vue.createElementVNode("a", {
                class: vue.normalizeClass(["f-next", {'f-disabled': !$options.isNextQuestionAvailable()}]),
                href: "#",
                onClick: _cache[3] || (_cache[3] = vue.withModifiers(function ($event) { return ($options.goToNextQuestion()); }, ["prevent"])),
                role: "button",
                "aria-label": $props.language.ariaNext
              }, [
                _hoisted_17,
                vue.createElementVNode("span", _hoisted_18, vue.toDisplayString($props.language.next), 1 /* TEXT */)
              ], 10 /* CLASS, PROPS */, _hoisted_16)
            ]))
          : vue.createCommentVNode("v-if", true),
        ($props.timer)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_19, [
              vue.createElementVNode("span", null, vue.toDisplayString($options.formatTime($data.time)), 1 /* TEXT */)
            ]))
          : vue.createCommentVNode("v-if", true)
      ])
    ])
  ], 2 /* CLASS */))
}

script$1.render = render;
script$1.__file = "src/components/FlowForm.vue";

var script = {
    name: 'Question',

    mixins: [
      ComponentInstance
    ],

    props: {
      id: null,
      modelValue: [String, Array, Boolean, Number, Object]
    },
    
    data: function data() {
      return {
        question: null
      }
    },

    mounted: function mounted() {
      this.setInstance();
    },

    render: function render() {
      return null
    },

    watch: {
      'question.answer': function question_answer(val) {
        this.$emit('update:modelValue', val);
      }
    }
  };

script.__file = "src/components/Question.vue";

exports.ChoiceOption = ChoiceOption;
exports.FlowForm = script$1;
exports.LanguageModel = LanguageModel;
exports.LinkOption = LinkOption;
exports.MaskPresets = MaskPresets;
exports.MatrixColumn = MatrixColumn;
exports.MatrixRow = MatrixRow;
exports.Question = script;
exports.QuestionModel = QuestionModel;
exports.QuestionType = QuestionType;
