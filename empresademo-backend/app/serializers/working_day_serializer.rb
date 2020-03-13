class WorkingDaySerializer < ActiveModel::Serializer
  attributes :id, :working, :created_at, :updated_at
  belongs_to :employee
end
