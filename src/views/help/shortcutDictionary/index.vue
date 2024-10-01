<template>
  <div>
    <vs-row justify="space-between">
      <vs-col xs="6" sm="4" lg="4">
        <div class="titlePage">
          <breadcrumb />
          <h2>{{ title }}</h2>
        </div>
      </vs-col>
    </vs-row>

    <section class="nodes">
      <div class="box view">
        <template>
          <transition name="slide-fade">
            <shortcut-table
              :ref="'ShortcutTable'"
            />
          </transition>
        </template>
      </div>
    </section>
  </div>
</template>
<script>
import master from "@/mixins/master";
import NavItem from "@/components/navbar/navTab";
import Breadcrumb from "@/components/breadcrumb/index";

import ShortcutTable from "@/views/help/shortcutDictionary/shortcutTable";

export default {
  name: "shortcut",
  mixins: [master],
  components: {
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    "shortcut-table": ShortcutTable,
  },
  data() {
    return {
      title: "Shortcut Dictionary",
    };
  },
};
</script>
