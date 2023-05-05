<script>
export default {
  name: 'SearchDropdown',
  props: {
    name: {
      type: String,
      required: false,
      default: 'input',
    },
    options: {
      type: Array,
      required: true,
      default: [],
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Søk etter vare',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxItem: {
      type: Number,
      required: false,
      default: 30,
    },
  },
  /**
   * Returns the initial data object for the component instance.
   *
   * @returns {Object} An object containing the initial values for the `selected`,
   * `optionsShown`, and `searchFilter` properties.
   */

  data() {
    return {
      selected: {},
      optionsShown: false,
      searchFilter: '',
    };
  },

  created() {
    //this.$emit('selected', this.selected);
  },
  computed: {
    /**
     * Returns an array of filtered options based on the current search filter and maximum item limit.
     *
     * @returns {Array} An array of filtered options.
     */
    filteredOptions() {
      const filtered = [];
      const regex = new RegExp(this.searchFilter, 'ig');
      for (const option of this.options) {
        if (this.searchFilter.length < 1 || option.name.match(regex)) {
          if (filtered.length < this.maxItem) filtered.push(option);
        } else {
          if (filtered.length > this.maxItem) filtered.push('option');
        }
      }
      return filtered;
    },
  },

  methods: {
    /**
     * Selects the given option and updates the component's state accordingly.
     *
     * @param {Object} option - The option to be selected.
     * @return {void}
     * @emits selected - Emitted when an option is selected. The selected option is passed as an argument.
     */
    selectOption(option) {
      this.selected = option;
      this.optionsShown = false;
      this.searchFilter = this.selected.name;
      this.$emit('selected', this.selected);
    },
    /**
     * Sets the `optionsShown` flag to `true` if the component is not disabled.
     * Also clears the search filter.
     */
    showOptions() {
      if (!this.disabled) {
        this.searchFilter = '';
        this.optionsShown = true;
      }
    },
    /**
     * Closes the options list and resets the search filter if no option is selected,
     * otherwise sets the search filter to the selected option's name.
     * Also resets the selected option and hides the options list.
     */
    exit() {
      if (!this.selected.id) {
        this.selected = {};
        this.searchFilter = '';
      } else {
        this.searchFilter = this.selected.name;
      }
      this.optionsShown = false;
    },
    /**
     * Monitors key events and selects the first option in the filtered options list if the
     * "Enter" key is pressed and at least one filtered option is available.
     * @param {Object} event - The key event object.
     */

    keyMonitor: function (event) {
      if (event.key === 'Enter' && this.filteredOptions[0])
        this.selectOption(this.filteredOptions[0]);
    },
  },
  watch: {
    /**
     * Watcher for changes in the searchFilter property.
     * If filteredOptions is empty, clear the selected property, otherwise set it to the first option in filteredOptions.
     * Emits a filter event with the current searchFilter value.
     */
    searchFilter() {
      if (this.filteredOptions.length === 0) {
        this.selected = {};
      } else {
        this.selected = this.filteredOptions[0];
      }
      this.$emit('filter', this.searchFilter);
    },
  },
};
</script>
<template>
  <div class="dropdown" v-if="options">
    <div id="dropdownToggle" class="dropdown-toggle">
      <input id="dropdownInput"
             :name="name"
             @focus="showOptions()"
             @blur="exit()"
             @keyup="keyMonitor"
             v-model="searchFilter"
             :disabled="disabled"
             :placeholder="placeholder"
      />
    </div>
    <ul class="dropdown-menu" v-show="optionsShown">
      <li
          @mousedown="selectOption(option)"
          v-for="(option, index) in filteredOptions"
          :key="index"
      >
        <a href="javascript:void(0)">
          {{ option.name || option.id || '-' }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown a:hover {
  text-decoration: none;
}

.dropdown-toggle {
  display: inline-block;
  border-radius: 2px 2px 0 0;
  width: 100%;
}

.dropdown-toggle input {
  border: none;
  background: #0002;
  padding: 0.5rem;
  outline: none;
  color: gray;
  border-radius: 4px;
  width: 100%;
}

.dropdown-toggle:hover input {
  background: #0004;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  width: 100%;
  padding: 10px 20px 10px 10px;
  margin: 0 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  overflow: auto;
  max-height: 50vh;
}

.dropdown-menu > li > a {
  padding: 10px 20px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
  max-width: 100%;
}

.dropdown-menu > li > a:hover {
  background: #efefef;
  color: #409fcb;
  border-radius: 4px;
}

.dropdown-menu > li {
  overflow: hidden;
  position: relative;
  margin: 0;
}

li {
  list-style: none;
}

</style>