class WorkingDay < ApplicationRecord
    belongs_to :employee
    accepts_nested_attributes_for :employee
end
