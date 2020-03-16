class WorkingDaysController < ApplicationController

  
  include Knock::Authenticable

  before_action :set_working_day, only: [:show, :update, :destroy]

  # GET /working_days
  def index
    @working_days = WorkingDay.all

    render json: @working_days
  end

  # GET /working_days/actives
  def actives
    render json: WorkingDay.where(working: true)
  end

  # GET /working_days/betweendates/
  def betweendates
    render json: WorkingDay.where("updated_at >= :from OR created_at <= :to",{from: params[:from], to: params[:to]})
  end  

  # GET /working_days/current/1
  def current
    render json: WorkingDay.where(employee_id: params[:employee_id]).order(created_at: :desc).first();
  end   
  
  # GET /working_days/byemployeeid/1
  def byemployeeid
    render json: WorkingDay.where(employee_id: params[:employee_id]).order(created_at: :desc);
  end   

  # GET /working_days/1
  def show
    render json: @working_day
  end

  # POST /working_days
  def create
    @working_day = WorkingDay.new(working_day_params)

    if @working_day.save
      render json: @working_day, status: :created, location: @working_day
    else
      render json: @working_day.errors, status: :unprocessable_entity
    end
  end

  # POST /working_days/in/:employee_id
  def in
    @working_day = WorkingDay.new(:working => true, :employee_id => params[:employee_id])
    if @working_day.save
      render json: @working_day, status: :created, location: @working_day
    else
      render json: @working_day.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /working_days/1
  def update
    if @working_day.update(working_day_params)
      render json: @working_day
    else
      render json: @working_day.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /working_days/out/:employee_id
  def out
    @working_day= WorkingDay.find_by(employee_id: params[:employee_id], working: true)
    if @working_day.update_attributes(working: false)
      render json: @working_day
    else
      render json: @working_day.errors, status: :unprocessable_entity
    end
  end

  # DELETE /working_days/1
  def destroy
    @working_day.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_working_day
      @working_day = WorkingDay.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def working_day_params
      params.require(:working_day).permit(:working)
    end

    def template_params
      params.require(:working_day).permit([:working, employee_attributes[:age]])
    end
end
