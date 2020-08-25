import countries from './countries'
const Parameter = {}

Parameter.SiginPage = {
  // 测试类型
  Type: {
    Title: '类型',
    Items: [
      { Value: 1, Label: '类型1' },
      { Value: 2, Label: '类型2' }
    ]
  }
}

Parameter.Common = {
  Country: countries
}

Parameter.DPGroup = {
  DataType: {
    Title: '数据类型',
    Items: [
      { Value: 1, Label: '文本' },
      { Value: 2, Label: '数字' },
      { Value: 3, Label: '布尔' },
      { Value: 4, Label: '时间' }
    ]
  },
  FieldType: {
    Title: '字段控件类型',
    Items: [
      { Value: 1, Label: 'TextBox' },
      { Value: 2, Label: 'NumberInput' },
      { Value: 3, Label: 'Checkbox' },
      { Value: 4, Label: 'DatePicker' },
      { Value: 5, Label: 'DateTimePicker' },
      { Value: 6, Label: 'TextArea' },
      { Value: 7, Label: 'SingleSelect' },
      { Value: 8, Label: 'MultipleSelect' }
    ]
  }
}

Parameter.Hr = {
  StaffType: {
    Title: '员工类型',
    Items: [
      { Value: 1, Label: '全职职工' },
      { Value: 2, Label: '劳派职工' },
      { Value: 3, Label: '外聘职工' },
      { Value: 4, Label: '实习生' },
      { Value: 5, Label: '兼职人员' },
      { Value: 6, Label: '退休返聘人员' }
    ]
  },

  TabStaffType: {
    Title: '员工类型',
    Items: [
      { Value: -1, Label: '已离职' },
      { Value: 0, Label: '在职' },
      { Value: 1, Label: '全职职工' },
      { Value: 2, Label: '劳派职工' },
      { Value: 3, Label: '外聘职工' },
      { Value: 4, Label: '实习生' },
      { Value: 5, Label: '兼职人员' },
      { Value: 6, Label: '退休返聘人员' }
    ]
  },

  StaffStatus: {
    Title: '员工状态',
    Items: [
      { Value: 0, Label: '试用' },
      { Value: 1, Label: '正式' }
    ]
  },

  EnumDegree: {
    Title: '学历',
    Items: [
      { Value: 1, Label: '高中以下' },
      { Value: 2, Label: '高中' },
      { Value: 3, Label: '中专' },
      { Value: 4, Label: '专科' },
      { Value: 5, Label: '本科' },
      { Value: 6, Label: '硕士' },
      { Value: 7, Label: '博士' }
    ]
  },

  EducationDegreeOptions: {
    Title: '教育经历学历层次',
    Items: [
      { Value: 1, Label: '初中' },
      { Value: 2, Label: '高中' },
      { Value: 3, Label: '中专' },
      { Value: 4, Label: '中技' },
      { Value: 5, Label: '大专' },
      { Value: 6, Label: '本科' },
      { Value: 7, Label: '硕士' },
      { Value: 8, Label: '博士' },
      { Value: 9, Label: 'MBA' },
      { Value: 10, Label: 'EMBA' },
      { Value: 11, Label: '其他' }
    ]
  },

  RecruitmentType: {
    Title: '招聘类型',
    Items: [
      { Value: 0, Label: '未设置' },
      { Value: 1, Label: '统招' },
      { Value: 2, Label: '非统招' }
    ]
  },

  DegreeType: {
    Title: '学历类型',
    Items: [
      { Value: 1, Label: '普通' },
      { Value: 2, Label: '普通专升本' },
      { Value: 3, Label: '成人高考' },
      { Value: 4, Label: '自考' },
      { Value: 5, Label: '电大' },
      { Value: 6, Label: '网络教育' }
    ]
  },
  QualificationType: {
    Title: '证照类型',
    Items: [
      {
        Value: '幼师资格证',
        Label: '幼师资格证'
      },
      {
        Value: '教师证',
        Label: '教师证'
      },
      {
        Value: '园长证',
        Label: '园长证'
      },
      {
        Value: '保育员证',
        Label: '保育员证'
      },
      {
        Value: '厨师证',
        Label: '厨师证'
      },
      {
        Value: '会计证',
        Label: '会计证'
      },
      {
        Value: '签证',
        Label: '签证'
      },
      {
        Value: '护照',
        Label: '护照'
      },
      {
        Value: '其他证件',
        Label: '其他证件'
      }
    ]
  },
  QualificationLevels: {
    Title: '证书等级',
    Items: [
      { Value: '初级', Label: '初级' },
      { Value: '中级', Label: '中级' },
      { Value: '高级', Label: '高级' }
    ]
  },

  RPType: {
    Title: '奖惩类型',
    Items: [
      { Value: 0, Label: '奖励' },
      { Value: 1, Label: '惩罚' }
    ]
  },

  WorkplaceType: {
    Title: '工作地点类型',
    Items: [
      { Value: 1, Label: '注册地址' },
      { Value: 2, Label: '总部地址' },
      { Value: 3, Label: '分支办公地址' }
    ]
  },

  IDTypes: {
    Title: '证件类型',
    Items: [
      { Value: 1, Label: '身份证' },
      { Value: 2, Label: '护照' },
      { Value: 3, Label: '港澳台通行证' },
      { Value: 4, Label: '其它' }
    ]
  },

  Gender: {
    Title: '性别',
    Items: [
      { Value: 1, Label: '女' },
      { Value: 2, Label: '男' }
    ]
  },

  ContractType: {
    Title: '合同类型',
    Items: [
      { Value: 1, Label: '劳动合同' },
      { Value: 2, Label: '劳务合同' },
      { Value: 3, Label: '实习合同' },
      { Value: 4, Label: '其他合同' }
    ]
  },

  ContractAttribute: {
    Title: '合同属性',
    Items: [
      { Value: 1, Label: '当前合同' },
      { Value: 2, Label: '历史合同' }
    ]
  },

  ContractStatus: {
    Title: '合同状态',
    Items: [
      { Value: 1, Label: '已生效' },
      { Value: 2, Label: '已终止' },
      { Value: 3, Label: '已续签' }
    ]
  },

  TermType: {
    Title: '期限类型',
    Items: [
      { Value: 1, Label: '固定期限' },
      { Value: 2, Label: '非固定期限' }
    ]
  },

  AgreementType: {
    Title: '协议类型',
    Items: [
      { Value: 1, Label: '保密协议' },
      { Value: 2, Label: '竞业协议' }
    ]
  },

  AgreementStatus: {
    Title: '协议状态',
    Items: [
      { Value: 1, Label: '有效' },
      { Value: 2, Label: '无效' },
      { Value: 3, Label: '效力待定' }
    ]
  },
  ApprovalStatus: {
    Title: '审批状态',
    Items: [
      { Value: 0, Label: '未开始' },
      { Value: 1, Label: '审批中' },
      { Value: 2, Label: '待归档' },
      { Value: 3, Label: '已通过' },
      { Value: 4, Label: '已驳回' },
      { Value: 5, Label: '已放弃' }
    ]
  },
  TransferStatus: {
    Title: '调动状态',
    Items: [
      { Value: 0, Label: '待确认' },
      { Value: 1, Label: '已确认' }
    ]
  }
}

export default Parameter
