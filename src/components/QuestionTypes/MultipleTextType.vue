<template>
<template v-for="subquestion, i in question.subquestions" :key="subquestion.id">
  <span v-if="typeof modelValue === 'object' && modelValue !== null"
        v-bind:data-placeholder="inputType === 'date' ? placeholder : null">
    <the-mask
      v-if="question.mask"
      :ref="i === 0 ? 'input' : `input-${i}`"
      v-bind:mask="question.mask"
      v-bind:masked="false"
      v-bind:type="inputType"
      v-bind:value="modelValue[subquestion.id]"
      v-bind:required="question.required"
      v-on:keydown="onKeyDown"
      v-on:keyup="onCompositeChange($event, subquestion.id)"
      v-on:focus="setFocus"
      v-on:blur="unsetFocus"
      v-on:keyup.enter.prevent="onCompositeEnter(subquestion.id)"
      v-on:keyup.tab.prevent="onCompositeEnter(subquestion.id)"
      v-bind:placeholder="subquestion.placeholder"
      v-bind:min="question.min"
      v-bind:max="question.max"
      v-on:change="onCompositeChange($event, subquestion.id)"
    />
    <input
      v-else
      :ref="i === 0 ? 'input' : `input-${i}`"
      v-bind:type="inputType"
      v-bind:value="modelValue[subquestion.id]"
      v-bind:required="question.required"
      v-on:keydown="onKeyDown($event, subquestion.id, i)"
      v-on:keyup="onCompositeChange($event, subquestion.id)"
      v-on:keyup.enter.prevent="onCompositeEnter(subquestion.id)"
      v-on:keyup.tab.prevent="onCompositeEnter(subquestion.id)"
      v-on:blur="unsetCompositeFocus(subquestion.id)"
      v-on:focus="setFocus"
      v-bind:min="question.min"
      v-bind:max="question.max"
      v-on:change="onCompositeChange($event, subquestion.id)"
      v-bind:placeholder="subquestion.placeholder"
      v-bind:maxlength="question.maxLength"
    />
  </span>
</template>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import BaseType from './BaseType.vue'
  import { QuestionType } from '../../models/QuestionModel'
  import TheMask from 'vue-the-mask/src/component'

  export default {
    extends: BaseType,
    name: QuestionType.MultipleText,
    components: {
      TheMask
    },

    data() {
      return {
        inputType: 'text',
        canReceiveFocus: true,
        touched: [],
      }
    },

    methods: {

      unsetCompositeFocus(key) {
        this.touched = [
          ...this.touched,
          key,
        ]
        this.unsetFocus()
      },

      onKeyDown($event, key, i) {
        this.enterPressed = false
        clearTimeout(this.timeoutId)

        if ($event) {
          if ($event.key === 'Enter' && !$event.shiftKey) {
            this.unsetCompositeFocus(key)
            const refName = `input-${i+1}`;
            if (this.$refs[refName]) {
              let el = this.$refs[refName];
              while (el && el.$el) {
                el = el.$el
              }
              el.focus();
            }
          }

          if (this.allowedChars !== null) {
            // Check if the entered character is allowed.
            // We always allow keys from the alwaysAllowedKeys array.
            if (this.alwaysAllowedKeys.indexOf($event.key) === -1 && this.allowedChars.indexOf($event.key) === -1) {
              $event.preventDefault()
            }
          }
        }
      },
      
      onCompositeEnter(key) {
        this.touched = [
          ...this.touched,
          key,
        ]
        this.onEnter()
      },

      onCompositeChange($event, key) {
        this.dirty = true
        this.dataValue[key] = $event.target.value

        this.touched = [
          ...this.touched,
          key,
        ]
        
        this.onKeyDown()
        this.setAnswer(this.dataValue)
      },
      
      
      validate() {
        
        for (const key of this.question.subquestions.map(o => o.id)) {
          if (this.touched.indexOf(key) === -1) {
            return false;
          } 
        }
        
        if (this.question.mask && this.hasValue) {
          return this.validateMask()
        }

        return !this.question.required || this.hasValue
      },

      validateMask() {
        if (Array.isArray(this.question.mask)) {
          return this.question.mask.some(mask => mask.length === this.dataValue.length)
        }

        return this.dataValue.length === this.question.mask.length
      }
    }
  }
</script>
