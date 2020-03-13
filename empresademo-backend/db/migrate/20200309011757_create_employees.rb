class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.belongs_to :user
      t.integer :age

      t.timestamps
    end
  end
end
