module.exports = {
  "level": "01",
  "name": "MII101IO",
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
          "name": "FUNCTION-CDE",
          "type": "X",
          "size": 1
        },
        {
          "level": "05",
          "name": "OPTION-CDE",
          "type": "X",
          "size": 1
        },
        {
          "level": "05",
          "name": "GACS-STK-NUM",
          "type": "X",
          "size": 14
        },
        {
          "level": "05",
          "name": "GACS-SER-NUM",
          "type": "X",
          "size": 5
        },
        {
          "level": "05",
          "name": "EMPLOYEE-NUM",
          "type": "X",
          "size": 10
        },
        {
          "level": "05",
          "name": "IUC-COMMENT",
          "type": "X",
          "size": 64
        },
        {
          "level": "05",
          "name": "GACS-INSTALL-DATE",
          "type": "X",
          "size": 10
        },
        {
          "level": "05",
          "name": "TSO-GROUP",
          "size": 4,
          "children": [
            {
              "level": "07",
              "name": "TIME-STANDARD-DESC",
              "type": "X",
              "size": 16
            },
            {
              "level": "07",
              "name": "TSO",
              "type": "X",
              "size": 10
            },
            {
              "level": "07",
              "name": "TIME-SINCE-OHAUL-AT-INST",
              "type": "X",
              "size": 10
            },
            {
              "level": "07",
              "name": "TIME-SINCE-REP-AT-INST",
              "type": "X",
              "size": 10
            },
            {
              "level": "07",
              "name": "TSO-AT-REMOVAL",
              "type": "X",
              "size": 10
            },
            {
              "level": "07",
              "name": "TOTAL-TIME",
              "type": "X",
              "size": 10
            },
            {
              "level": "07",
              "name": "N-H-A-TSO-AT-INSTALLATION",
              "type": "X",
              "size": 10
            }
          ]
        }
      ],
      "size": 1
    },
    {
      "level": "03",
      "name": "OUTPUT-DATA",
      "children": [
        {
          "level": "05",
          "name": "ARF-STOCK-NUM",
          "type": "X",
          "size": 14
        },
        {
          "level": "05",
          "name": "ARF-SERIAL-NUM",
          "type": "X",
          "size": 5
        },
        {
          "level": "05",
          "name": "EXTERNAL-MESSAGE-TABLE",
          "children": [
            {
              "level": "07",
              "name": "EXTERNAL-MESSAGE",
              "size": 3,
              "children": [
                {
                  "level": "09",
                  "name": "MESSAGE-IDENTIFICATION",
                  "type": "X",
                  "size": 8
                },
                {
                  "level": "09",
                  "name": "MESSAGE-TEXT",
                  "type": "X",
                  "size": 54
                }
              ]
            }
          ],
          "size": 1
        },
        {
          "level": "05",
          "name": "ICS-ORIG-FINAL-DATA",
          "children": [
            {
              "level": "07",
              "name": "ICS-START-TAG",
              "type": "X",
              "size": 5
            },
            {
              "level": "07",
              "name": "NCA-PART-NUM",
              "type": "X",
              "size": 14
            },
            {
              "level": "07",
              "name": "NCA-SERIAL-NUM",
              "type": "X",
              "size": 5
            },
            {
              "level": "07",
              "name": "KEYWORD",
              "type": "X",
              "size": 15
            },
            {
              "level": "07",
              "name": "DESCRIPTION",
              "type": "X",
              "size": 35
            },
            {
              "level": "07",
              "name": "CALCULATED-DATE",
              "children": [
                {
                  "level": "09",
                  "name": "CALCULATED-DAY",
                  "type": "X",
                  "size": 2
                },
                {
                  "level": "09",
                  "name": "CALCULATED-MONTH",
                  "type": "X",
                  "size": 3
                },
                {
                  "level": "09",
                  "name": "CALCULATED-YEAR",
                  "type": "X",
                  "size": 2
                }
              ],
              "size": 1
            },
            {
              "level": "07",
              "name": "INSTALLED-DATE",
              "children": [
                {
                  "level": "09",
                  "name": "INSTALLED-DAY",
                  "type": "X",
                  "size": 2
                },
                {
                  "level": "09",
                  "name": "INSTALLED-MONTH",
                  "type": "X",
                  "size": 3
                },
                {
                  "level": "09",
                  "name": "INSTALLED-YEAR",
                  "type": "X",
                  "size": 2
                }
              ],
              "size": 1
            },
            {
              "level": "07",
              "name": "TSO-GROUP",
              "size": 4,
              "children": [
                {
                  "level": "09",
                  "name": "TIME-STANDARD-DESC",
                  "type": "X",
                  "size": 16
                },
                {
                  "level": "09",
                  "name": "TIME-ERROR-IND",
                  "type": "X",
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "TSO",
                  "type": "X",
                  "size": 10
                },
                {
                  "level": "09",
                  "name": "TIME-SINCE-OHAUL-AT-INST",
                  "type": "X",
                  "size": 10
                },
                {
                  "level": "09",
                  "name": "TIME-SINCE-REP-AT-INST",
                  "type": "X",
                  "size": 10
                },
                {
                  "level": "09",
                  "name": "TSO-AT-REMOVAL",
                  "type": "X",
                  "size": 10
                },
                {
                  "level": "09",
                  "name": "TOTAL-TIME",
                  "type": "X",
                  "size": 10
                },
                {
                  "level": "09",
                  "name": "N-H-A-TSO-AT-INSTALLATION",
                  "type": "X",
                  "size": 10
                }
              ]
            },
            {
              "level": "07",
              "name": "ICS-END-TAG",
              "type": "X",
              "size": 6
            }
          ],
          "size": 1
        },
        {
          "level": "05",
          "name": "IES-FINAL-DATA",
          "children": [
            {
              "level": "07",
              "name": "IES-START-TAG",
              "type": "X",
              "size": 5
            },
            {
              "level": "07",
              "name": "NCA-PART-NUMBER",
              "type": "X",
              "size": 14
            },
            {
              "level": "07",
              "name": "NCA-SERIAL-NUMBER",
              "type": "X",
              "size": 5
            },
            {
              "level": "07",
              "name": "PART-DATA",
              "children": [
                {
                  "level": "09",
                  "name": "FTN-NUMBER",
                  "type": "X",
                  "size": 6
                },
                {
                  "level": "09",
                  "name": "MFG-PART-NUMBER",
                  "type": "X",
                  "size": 20
                },
                {
                  "level": "09",
                  "name": "MFG-SERIAL-NUMBER",
                  "type": "X",
                  "size": 15
                },
                {
                  "level": "09",
                  "name": "KEYWORD-DESCRIPTION",
                  "type": "X",
                  "size": 50
                },
                {
                  "level": "09",
                  "name": "SECONDARY-SERIAL-NUMBER",
                  "type": "X",
                  "size": 10
                },
                {
                  "level": "09",
                  "name": "OWNER-CODE",
                  "type": "X",
                  "size": 5
                },
                {
                  "level": "09",
                  "name": "PRIME-SHOP",
                  "type": "X",
                  "size": 3
                },
                {
                  "level": "09",
                  "name": "SERVICEABILITY-DESC",
                  "type": "X",
                  "size": 13
                },
                {
                  "level": "09",
                  "name": "POSITION-CODE",
                  "type": "X",
                  "size": 3
                },
                {
                  "level": "09",
                  "name": "DESCRIPTION-CODE",
                  "type": "X",
                  "size": 10
                },
                {
                  "level": "09",
                  "name": "ON-OFF-LIT",
                  "type": "X",
                  "size": 3
                },
                {
                  "level": "09",
                  "name": "AIRCRAFT-NUMBER",
                  "type": "X",
                  "size": 5
                },
                {
                  "level": "09",
                  "name": "AC-POSITION-CODE",
                  "type": "X",
                  "size": 3
                },
                {
                  "level": "09",
                  "name": "TRACKING-LOCATION",
                  "type": "X",
                  "size": 42
                },
                {
                  "level": "09",
                  "name": "PREVIOUS-LOCATION",
                  "type": "X",
                  "size": 42
                },
                {
                  "level": "09",
                  "name": "TYPE-MAINTENANCE",
                  "type": "X",
                  "size": 12
                },
                {
                  "level": "09",
                  "name": "MAINTENANCE-DATE",
                  "children": [
                    {
                      "level": "11",
                      "name": "DAYS",
                      "type": "X",
                      "size": 2
                    },
                    {
                      "level": "11",
                      "name": "MONTH",
                      "type": "X",
                      "size": 3
                    },
                    {
                      "level": "11",
                      "name": "YEAR",
                      "type": "X",
                      "size": 2
                    }
                  ],
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "WORK-CONTROL-LIT",
                  "type": "X",
                  "size": 31
                }
              ],
              "size": 1
            },
            {
              "level": "07",
              "name": "NHA-DATA",
              "children": [
                {
                  "level": "09",
                  "name": "ON-OFF-LIT",
                  "type": "X",
                  "size": 3
                },
                {
                  "level": "09",
                  "name": "NHA-PART-NUMBER",
                  "type": "X",
                  "size": 14
                },
                {
                  "level": "09",
                  "name": "NHA-SERIAL-NUMBER",
                  "type": "X",
                  "size": 5
                },
                {
                  "level": "09",
                  "name": "NHA-MFG-SER-NUM",
                  "type": "X",
                  "size": 15
                },
                {
                  "level": "09",
                  "name": "NHA-KEYWORD",
                  "type": "X",
                  "size": 15
                },
                {
                  "level": "09",
                  "name": "INST-NHA-DATE",
                  "children": [
                    {
                      "level": "11",
                      "name": "DAYS",
                      "type": "X",
                      "size": 2
                    },
                    {
                      "level": "11",
                      "name": "MONTH",
                      "type": "X",
                      "size": 3
                    },
                    {
                      "level": "11",
                      "name": "YEAR",
                      "type": "X",
                      "size": 2
                    }
                  ],
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "ON-OFF-AC-DATE",
                  "children": [
                    {
                      "level": "11",
                      "name": "DAYS",
                      "type": "X",
                      "size": 2
                    },
                    {
                      "level": "11",
                      "name": "MONTH",
                      "type": "X",
                      "size": 3
                    },
                    {
                      "level": "11",
                      "name": "YEAR",
                      "type": "X",
                      "size": 2
                    }
                  ],
                  "size": 1
                }
              ],
              "size": 1
            },
            {
              "level": "07",
              "name": "TIME-GROUP",
              "size": 4,
              "children": [
                {
                  "level": "09",
                  "name": "TIME-STANDARD-DESC",
                  "type": "X",
                  "size": 24
                },
                {
                  "level": "09",
                  "name": "TSO",
                  "children": [
                    {
                      "level": "11",
                      "name": "SIGN-OF-THE-TIME",
                      "type": "X",
                      "size": 1
                    },
                    {
                      "level": "11",
                      "name": "VALUE-OF-TIME",
                      "type": "X",
                      "size": 9
                    }
                  ],
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "TOTAL-TIME",
                  "children": [
                    {
                      "level": "11",
                      "name": "SIGN-OF-THE-TIME",
                      "type": "X",
                      "size": 1
                    },
                    {
                      "level": "11",
                      "name": "VALUE-OF-TIME",
                      "type": "X",
                      "size": 9
                    }
                  ],
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "TIME-SINCE-REPAIR",
                  "children": [
                    {
                      "level": "11",
                      "name": "SIGN-OF-THE-TIME",
                      "type": "X",
                      "size": 1
                    },
                    {
                      "level": "11",
                      "name": "VALUE-OF-TIME",
                      "type": "X",
                      "size": 9
                    }
                  ],
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "TIME-SINCE-OHAUL-AT-INST",
                  "children": [
                    {
                      "level": "11",
                      "name": "SIGN-OF-THE-TIME",
                      "type": "X",
                      "size": 1
                    },
                    {
                      "level": "11",
                      "name": "VALUE-OF-TIME",
                      "type": "X",
                      "size": 9
                    }
                  ],
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "ALLOWABLE-TTO",
                  "type": "X",
                  "size": 9
                },
                {
                  "level": "09",
                  "name": "ALLOWABLE-TIME-TO-OHAUL-SRC",
                  "type": "X",
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "ALLOWABLE-LIFE",
                  "type": "X",
                  "size": 10
                },
                {
                  "level": "09",
                  "name": "ALLOWABLE-LIFE-SRC",
                  "type": "X",
                  "size": 1
                },
                {
                  "level": "09",
                  "name": "TIME-REMAINING",
                  "children": [
                    {
                      "level": "11",
                      "name": "SIGN-OF-THE-TIME",
                      "type": "X",
                      "size": 1
                    },
                    {
                      "level": "11",
                      "name": "VALUE-OF-TIME",
                      "type": "X",
                      "size": 9
                    }
                  ],
                  "size": 1
                }
              ]
            },
            {
              "level": "07",
              "name": "IES-END-TAG",
              "type": "X",
              "size": 6
            }
          ],
          "size": 1
        }
      ],
      "size": 1
    },
    {
      "level": "03",
      "name": "FILLER",
      "type": "X",
      "size": 50
    }
  ],
  "size": 1
}