class EmployerSerializer < ActiveModel::Serializer
  attributes :id, :user
  belongs_to :user
end
