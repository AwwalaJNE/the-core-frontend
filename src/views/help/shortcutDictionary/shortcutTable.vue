<template>
  <div>
    <table-master
      :dataTable="dataTable"
      :dataColumn="datacolumn"
      :hasAction="false"
      :hasPagination="false"
    />
  </div>
</template>
<script>
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster.vue";
export default {
  name: "shortcut-table",
  mixins: [master],
  components: {
    "table-master": TableMaster,
  },
  data() {
    return {
      dataTable: [],
      datacolumn: [
        {
          label: "Shortcut",
          key: "shortcut",
          width: "md",
        },
        {
          label: "Process",
          key: "process",
          width: "md",
        },
        {
          label: "Description",
          key: "description",
          width: "md",
        },
      ],
    };
  },
  methods: {
    constructTableData() {
      this.dataTable = [
        {
          shortcut: 'Ctrl + P',
          process: 'All Detail Process',
          description: 'Open print'
        },
        {
          shortcut: 'Ctrl + C',
          process: 'All Process',
          description: 'Copy selected text'
        },
        {
          shortcut: 'Ctrl + V',
          process: 'All Process',
          description: 'Paste copied text'
        },
        {
          shortcut: 'Tab',
          process: 'All Form Input',
          description: 'Move to the next form field'
        },
        {
          shortcut: 'Shift + Tab',
          process: 'All Form Input',
          description: 'Move to the previous form field'
        },
        {
          shortcut: 'Esc',
          process: 'All Dialog Process',
          description: 'Cancel or close a modal/dialog'
        },
        {
          shortcut: 'Ctrl + Enter',
          process: 'All Dialog Process',
          description: 'Submit the form'
        },
        {
          shortcut: 'Ctrl + /',
          process: 'Trace Connote',
          description: 'Go to Trace Connote page'
        },
        {
          shortcut: 'Ctrl + Shift + /',
          process: 'Trace Bag',
          description: 'Go to Trace Bag page'
        },
        {
          shortcut: 'Ctrl + Shift + I',
          process: 'Inventory Item',
          description: 'Go to Inventory Item List'
        },
        {
          shortcut: 'Ctrl + Shift + F',
          process: 'Search Feature',
          description: 'Open Search feature'
        },
        {
          shortcut: 'Ctrl + Shift + H',
          process: 'Help',
          description: 'Go to Help feature'
        },
        {
          shortcut: 'Ctrl + Shift + R',
          process: 'Runsheet',
          description: 'Open dialog Create New Runsheet'
        },
        {
          shortcut: 'Ctrl + Shift + T',
          process: 'New Transaction',
          description: 'Go to Create New Transaction page'
        },
        {
          shortcut: 'Ctrl + Shift + V',
          process: 'Receiving',
          description: 'Go to Receiving Page'
        },
        {
          shortcut: 'Ctrl + Shift + B',
          process: 'Create Bag',
          description: 'Go to Create Bag page'
        },
        {
          shortcut: 'Ctrl + Shift + O',
          process: 'Open Bag',
          description: 'Go to Open Bag page'
        },
        {
          shortcut: 'Ctrl + Shift + S + J',
          process: 'Surat Jalan',
          description: 'Open dialog Create New Surat Jalan'
        },
        {
          shortcut: 'Ctrl + Shift + S + M',
          process: 'Surat Muatan',
          description: 'Open dialog Create Surat Muatan'
        }
      ]
    },
  },
  mounted() {
    this.constructTableData()
  }
};
</script>
