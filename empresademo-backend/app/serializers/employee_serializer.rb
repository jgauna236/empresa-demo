class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :age, :user
  belongs_to :user
end
