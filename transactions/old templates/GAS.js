module.exports = {
  "returns input?": false,
  input: [
    {
      name: 'transaction-code',
      type: 'X',
      size: 8
    },
    {
      name: 'message-ind',
      type: 'X',
      size: 1
    },
    {
      name: 'tracking-number',
      type: 'X',
      size: 7
    },
    {
      name: 'nca-part-number',
      type: 'X',
      size: 14
    },
    {
      name: 'nca-serial-number',
      type: '9',
      size: 5
    }
  ],
  output: [
    {
      name: 'history-nha',
      size: 1,
      children: [
        {
          name: 'next-highest-assembly-id',
          size: 14
        },
        {
          name: 'nha-serial-number',
          size: 5
        },
        {
          name: 'off-on-assembly-date',
          size: 7
        },
        {
          name: 'aircraft-number',
          size: 5
        },
        {
          name: 'position-code',
          size: 3
        },
        {
          name: 'off-on-aircraft-date',
          size: 7
        }
      ]
    },
    {
      name: 'current-nha',
      size: 1,
      children: [
        {
          name: 'next-highest-assembly-id',
          size: 14
        },
        {
          name: 'nha-serial-number',
          size: 5
        },
        {
          name: 'off-on-assembly-date',
          size: 7
        },
        {
          name: 'aircraft-number',
          size: 5
        },
        {
          name: 'position-code',
          size: 3
        },
        {
          name: 'off-on-aircraft-date',
          size: 7
        }
      ]
    },
    {
      name: 'assembly-detail-count',
      size: 4
    },
    { name: 'assembly-detail', size: 100,
      children: [
        { name: 'assembly-group', size: 1,
          children: [
            { name: 'assembly-ind', size: 1 },
            { name: 'nca-part-number', size: 14 },
            { name: 'fill-space1', size: 6 },
            { name: 'nca-serial-number', size: 5 },
            { name: 'keyword-description', size: 1,
              children: [
                { name: 'keyword', size: 15 },
                { name: 'description', size:35 }
              ]
            },
            { name: 'position-code', size: 3 }
          ]
        },
        { name: 'mfg-group', size: 1,
          children: [
            { name: 'mfg-part-number', size: 20 },
            { name: 'fill-space1', size: 6 },
            { name: 'mfg-serial-number', size: 15 },
            { name: 'fill-space2', size: 2 }
          ]
        },
        { name: 'time-group', size: 6,
          children: [
            { name: 'request-status', size: 4 },
            { name: 'life-limit-ind', size: 1 },
            { name: 'time-standard', size: 1 },
            { name: 'time-remaining', size: 7 },
            { name: 'time-since-overhaul', size: 6 },
            { name: 'total-time', size: 6 },
            { name: 'time-since-installation', size: 6 }
          ]
        },
        { name: 'ftn-group', size: 1,
          children: [
            { name: 'ftn-number', size: 6 },
            { name: 'ownership-code', size: 5 }
          ]
        }
      ]
    }
  ]
}