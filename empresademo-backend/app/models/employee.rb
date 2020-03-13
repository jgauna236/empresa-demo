class Employee < ApplicationRecord
    belongs_to :user
    has_many :working_days
    accepts_nested_attributes_for :user
    
end
