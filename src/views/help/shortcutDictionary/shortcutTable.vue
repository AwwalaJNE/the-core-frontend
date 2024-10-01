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
          shortcut: 'Ctrl + I',
          process: 'Inventory Item',
          description: 'Go to Inventory Item List'
        },
        {
          shortcut: 'Ctrl + Shift + F',
          process: 'Search Feature',
          description: 'Go to Search feature'
        },
        {
          shortcut: 'Ctrl + Shift + H',
          process: 'Help',
          description: 'Go to Help feature'
        },
        {
          shortcut: 'Ctrl + N + R',
          process: 'Runsheet',
          description: 'Open dialog Create New Runsheet'
        },
        {
          shortcut: 'Ctrl + N + T',
          process: 'New Transaction',
          description: 'Go to Create New Transaction page'
        },
        {
          shortcut: 'Ctrl + N + C',
          process: 'Trace Connote',
          description: 'Go to Trace Connote page'
        },
        {
          shortcut: 'Ctrl + N + V',
          process: 'Receiving',
          description: 'Go to Receiving Page'
        },
        {
          shortcut: 'Ctrl + N + B',
          process: 'Create Bag',
          description: 'Go to Create Bag page'
        },
        {
          shortcut: 'Ctrl + N + O',
          process: 'Open Bag',
          description: 'Go to Open Bag page'
        },
        {
          shortcut: 'Ctrl + N + S + J',
          process: 'Surat Jalan',
          description: 'Open dialog Create New Surat Jalan'
        },
        {
          shortcut: 'Ctrl + N + S + M',
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
