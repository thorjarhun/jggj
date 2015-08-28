module.exports = {
  "returns input?": true,
  input: [
    { name: 'transaction-code', size: 8, type: 'X' },
    { name: 'function-cde', size: 1, type: 'X' },
    { name: 'option-cde', size: 1, type: 'X' },
    { name: 'gacs-stk-num', size: 14, type: 'X' },
    { name: 'gacs-ser-num', size: 5, type: 'X' },
    { name: 'employee-num', size: 10, type: 'X' },
    { name: 'iuc-comment', size: 64, type: 'X' },
    { name: 'gacs-install-date', size: 10, type: 'X' },
    {
      name: 'tso-group', size: 4,
      children: [
        { name: 'time-standard-desc', size: 16, type: 'X' },
        { name: 'tso', size: 10, type: 'X' },
        { name: 'time-since-ohaul-at-inst', size: 10, type: 'X' },
        { name: 'time-since-rep-at-inst', size: 10, type: 'X' },
        { name: 'tso-at-removal', size: 10, type: 'X' },
        { name: 'total-time', size: 10, type: 'X' },
        { name: 'n-h-a-tso-at-installation', size: 10, type: 'X' }
      ]
    }
  ],
  output: [
    { name: 'arf-stock-num', size: 14 },
    { name: 'arf-serial-num', size: 5 },
    { name: 'external-message-table', size: 3,
      children: [
        { name: 'message-identification', size: 8 },
        { name: 'message-text', size: 54 }
      ]
    },
    { name: 'ics-orig-final-data', size: 1,
      children: [
        { name: 'ics-start-tag', size: 5 },
        { name: 'nca-part-num', size: 14 },
        { name: 'nca-serial-num', size: 5 },
        { name: 'keyword', size: 15 },
        { name: 'description', size: 35 },
        { name: 'calculated-date', size: 1,
          children: [
            { name: 'calculated-day', size: 2 },
            { name: 'calculated-month', size: 3 },
            { name: 'calculated-year', size: 2 },
          ]
        },
        { name: 'installed-date', size: 1,
          children: [
            { name: 'installed-day', size: 2 },
            { name: 'installed-month', size: 3 },
            { name: 'installed-year', size: 2 },
          ]
        },
        { name: 'tso-group', size: 4,
          children: [
            { name: 'time-standard-desc', size: 16 },
            { name: 'time-error-ind', size: 1 },
            { name: 'tso', size: 10 },
            { name: 'time-since-ohaul-at-inst', size: 10 },
            { name: 'time-since-rep-at-inst', size: 10 },
            { name: 'tso-at-removal', size: 10 },
            { name: 'total-time', size: 10 },
            { name: 'n-h-a-tso-at-installation', size: 10 }
          ]
        },
        { name: 'ics-end-tag', size: 6 }
      ]
    },
    { name: 'ies-final-data', size: 1,
      children: [
        { name: 'ies-start-tag', size: 5 },
        { name: 'nca-part-number', size: 14 },
        { name: 'nca-serial-number', size: 5 },
        { name: 'part-data', size: 1,
          children: [
            { name: 'ftn-number', size: 6 },
            { name: 'mfg-part-number', size: 20 },
            { name: 'mfg-serial-number', size: 15 },
            { name: 'keyword-description', size: 50 },
            { name: 'owner-code', size: 5 },
            { name: 'prime-shop', size: 3 },
            { name: 'serviceability-desc', size: 13 },
            { name: 'position-code', size: 3 },
            { name: 'description-code', size: 10 },
            { name: 'on-off-lit', size: 3 },
            { name: 'aircraft-number', size: 5 },
            { name: 'ac-position-code', size: 3 },
            { name: 'tracking-location', size: 42 },
            { name: 'previous-location', size: 42 },
            { name: 'type-maintenance', size: 12 },
            { name: 'maintenance-date', size: 1,
              children: [
                { name: 'days', size: 2 },
                { name: 'month', size: 3 },
                { name: 'year', size: 2 }
              ]
            },
            { name: 'work-control-lit', size: 31 }
          ]
        },
        { name: 'nha-data', size: 1,
          children: [
            { name: 'on-off-lit', size: 3 },
            { name: 'nha-part-number', size: 14 },
            { name: 'nha-serial-number', size: 5 },
            { name: 'nha-mfg-ser-num', size: 15 },
            { name: 'nha-keyword', size: 15 },
            { name: 'inst-nha-date', size: 1,
              children: [
                { name: 'days', size: 2 },
                { name: 'month', size: 3 },
                { name: 'year', size: 2 }
              ]
            },
            { name: 'on-off-ac-date', size: 1,
              children: [
                { name: 'days', size: 2 },
                { name: 'month', size: 3 },
                { name: 'year', size: 2 }
              ]
            }
          ]
        },
        { name: 'time-group', size: 4,
          children: [
            { name: 'time-standard-desc', size: 24 },
            { name: 'tso', size: 1,
              children: [
                { name: 'sign-of-the-time', size: 1 },
                { name: 'value-of-time', size: 9 }
              ]
            },
            { name: 'total-time', size: 1,
              children: [
                { name: 'sign-of-the-time', size: 1 },
                { name: 'value-of-time', size: 9 }
              ]
            },
            { name: 'time-since-repair', size: 1,
              children: [
                { name: 'sign-of-the-time', size: 1 },
                { name: 'value-of-time', size: 9 }
              ]
            },
            { name: 'time-since-ohaul-at-inst', size: 1,
              children: [
                { name: 'sign-of-the-time', size: 1 },
                { name: 'value-of-time', size: 9 }
              ]
            },
            { name: 'allowable-tto', size: 9 },
            { name: 'allowable-time-to-ohaul-src', size: 1 },
            { name: 'allowable-life', size: 10 },
            { name: 'allowable-life-src', size: 1 },
            { name: 'time-remaining', size: 1,
              children: [
                { name: 'sign-of-the-time', size: 1 },
                { name: 'value-of-time', size: 9 }
              ]
            }
          ]
        },
        { name: 'ies-end-tag', size: 6 }
      ]
    }
  ]
};