class CreateWorkingDays < ActiveRecord::Migration[6.0]
  def change
    create_table :working_days do |t|
      t.boolean :working
      t.belongs_to :employee

      t.timestamps
    end
  end
end
