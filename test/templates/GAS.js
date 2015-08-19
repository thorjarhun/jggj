module.exports = {
  "level": "01",
  "name": "MSO105IO",
  "children": [
    {
      "level": "03",
      "name": "TRANSACTION-CODE",
      "type": "X",
      "size": 8
    },
    {
      "level": "03",
      "name": "INPUT-DATA",
      "children": [
        {
          "level": "05",
          "name": "MESSAGE-IND",
          "type": "X",
          "size": 1
        },
        {
          "level": "05",
          "name": "TRACKING-NUMBER",
          "type": "X",
          "size": 7
        },
        {
          "level": "05",
          "name": "NCA-PART-NUMBER",
          "type": "X",
          "size": 14
        },
        {
          "level": "05",
          "name": "NCA-SERIAL-NUMBER",
          "type": "9",
          "size": 5
        }
      ],
      "size": 1
    },
    {
      "level": "03",
      "name": "OUTPUT-DATA",
      "children": [
        {
          "level": "10",
          "name": "HISTORY-NHA",
          "children": [
            {
              "level": "15",
              "name": "NEXT-HIGHEST-ASSEMBLY-ID",
              "type": "X",
              "size": 14
            },
            {
              "level": "15",
              "name": "NHA-SERIAL-NUMBER",
              "type": "X",
              "size": 5
            },
            {
              "level": "15",
              "name": "OFF-ON-ASSEMBLY-DATE",
              "type": "X",
              "size": 7
            },
            {
              "level": "15",
              "name": "AIRCRAFT-NUMBER",
              "type": "X",
              "size": 5
            },
            {
              "level": "15",
              "name": "POSITION-CODE",
              "type": "X",
              "size": 3
            },
            {
              "level": "15",
              "name": "OFF-ON-AIRCRAFT-DATE",
              "type": "X",
              "size": 7
            }
          ],
          "size": 1
        },
        {
          "level": "10",
          "name": "CURRENT-NHA",
          "children": [
            {
              "level": "15",
              "name": "NEXT-HIGHEST-ASSEMBLY-ID",
              "type": "X",
              "size": 14
            },
            {
              "level": "15",
              "name": "NHA-SERIAL-NUMBER",
              "type": "X",
              "size": 5
            },
            {
              "level": "15",
              "name": "OFF-ON-ASSEMBLY-DATE",
              "type": "X",
              "size": 7
            },
            {
              "level": "15",
              "name": "AIRCRAFT-NUMBER",
              "type": "X",
              "size": 5
            },
            {
              "level": "15",
              "name": "POSITION-CODE",
              "type": "X",
              "size": 3
            },
            {
              "level": "15",
              "name": "OFF-ON-AIRCRAFT-DATE",
              "type": "X",
              "size": 7
            }
          ],
          "size": 1
        },
        {
          "level": "10",
          "name": "ASSEMBLY-DETAIL-COUNT",
          "type": "9",
          "size": 4
        },
        {
          "level": "10",
          "name": "ASSEMBLY-DETAIL",
          "size": 100,
          "children": [
            {
              "level": "15",
              "name": "ASSEMBLY-GROUP",
              "children": [
                {
                  "level": "20",
                  "name": "ASSEMBLY-IND",
                  "type": "X",
                  "size": 1
                },
                {
                  "level": "20",
                  "name": "NCA-PART-NUMBER",
                  "type": "X",
                  "size": 14
                },
                {
                  "level": "20",
                  "name": "FILL-SPACE1",
                  "type": "X",
                  "size": 6
                },
                {
                  "level": "20",
                  "name": "NCA-SERIAL-NUMBER",
                  "type": "X",
                  "size": 5
                },
                {
                  "level": "20",
                  "name": "KEYWORD-DESCRIPTION",
                  "type": "X",
                  "size": 50
                },
                {
                  "level": "20",
                  "name": "KEYWORD-DESCRIPTION-WORK",
                  "alias": "KEYWORD-DESCRIPTION",
                  "children": [
                    {
                      "level": "25",
                      "name": "KEYWORD",
                      "type": "X",
                      "size": 15
                    },
                    {
                      "level": "25",
                      "name": "DESCRIPTION",
                      "type": "X",
                      "size": 35
                    }
                  ],
                  "size": 1
                },
                {
                  "level": "20",
                  "name": "POSITION-CODE",
                  "type": "X",
                  "size": 3
                }
              ],
              "size": 1
            },
            {
              "level": "15",
              "name": "MFG-GROUP",
              "children": [
                {
                  "level": "20",
                  "name": "MFG-PART-NUMBER",
                  "type": "X",
                  "size": 20
                },
                {
                  "level": "20",
                  "name": "FILL-SPACE1",
                  "type": "X",
                  "size": 6
                },
                {
                  "level": "20",
                  "name": "MFG-SERIAL-NUMBER",
                  "type": "X",
                  "size": 15
                },
                {
                  "level": "20",
                  "name": "FILL-SPACE2",
                  "type": "X",
                  "size": 2
                }
              ],
              "size": 1
            },
            {
              "level": "15",
              "name": "TIME-GROUP",
              "size": 6,
              "children": [
                {
                  "level": "20",
                  "name": "REQUEST-STATUS",
                  "type": "X",
                  "size": 4
                },
                {
                  "level": "20",
                  "name": "LIFE-LIMIT-IND",
                  "type": "X",
                  "size": 1
                },
                {
                  "level": "20",
                  "name": "TIME-STANDARD",
                  "type": "X",
                  "size": 1
                },
                {
                  "level": "20",
                  "name": "TIME-REMAINING",
                  "type": "X",
                  "size": 7
                },
                {
                  "level": "20",
                  "name": "TIME-SINCE-OVERHAUL",
                  "type": "X",
                  "size": 6
                },
                {
                  "level": "20",
                  "name": "TOTAL-TIME",
                  "type": "X",
                  "size": 6
                },
                {
                  "level": "20",
                  "name": "TIME-SINCE-INSTALLATION",
                  "type": "X",
                  "size": 6
                }
              ]
            },
            {
              "level": "15",
              "name": "FTN-GROUP",
              "children": [
                {
                  "level": "20",
                  "name": "FTN-NUMBER",
                  "type": "X",
                  "size": 6
                },
                {
                  "level": "20",
                  "name": "OWNERSHIP-CODE",
                  "type": "X",
                  "size": 5
                }
              ],
              "size": 1
            }
          ]
        }
      ],
      "size": 1
    },
    {
      "level": "03",
      "name": "EXTERNAL-MESSAGE-TABLE",
      "children": [
        {
          "level": "05",
          "name": "EXTERNAL-MESSAGE",
          "size": 3,
          "children": [
            {
              "level": "07",
              "name": "MESSAGE-IDENTIFICATION",
              "type": "X",
              "size": 8
            },
            {
              "level": "07",
              "name": "MESSAGE-TEXT",
              "type": "X",
              "size": 54
            }
          ]
        }
      ],
      "size": 1
    }
  ],
  "size": 1
}