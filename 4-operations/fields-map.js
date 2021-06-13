'use strict';

const fields_map = [
  {
    key: 'vendor_sku',
    field: 'Stock#'
  },
  {
    key: 'carat',
    field: 'Carat'
  },
  {
    key: 'shipping_availability',
    default_value: 'guaranteed'
  },
  {
    key: 'certificate_lab',
    field: 'Lab',
    values_map: {
      agsl: 'AGSL',
      ags: 'AGSL',
      df: 'DF',
      egl: 'EGL',
      gcal: 'GCAL',
      ghi: 'GHI',
      gia: 'GIA',
      gsi: 'GSI',
      hrd: 'HRD',
      igi: 'IGI',
      iidgr: 'IIDGR',
      pgs: 'PGS'
    }
  },
  {
    key: 'certificate_number',
    field: 'Cert#'
  },
  {
    key: 'shape',
    values_map: {
      round: 'RD',
      princess: 'PR',
      emerald: 'EM',
      cushion: 'CU',
      radiant: 'RA',
      asscher: 'AS',
      pear: 'PS',
      oval: 'OV',
      marquise: 'MQ',
      heart: 'HS'
    }
  }
];

module.exports = fields_map;