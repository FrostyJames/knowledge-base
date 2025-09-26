# seed.py
from app import create_app, db
from models import User, Role, Permission, Category, Tag, Article, ArticleMedia

app = create_app()

def seed_data():
    with app.app_context():
        # Drop and recreate tables for clean seeding
        db.create_all()
        
        # dictionary of {Model: seeding_function}
        seeds = {
            Permission: seed_permissions,
            Role: seed_roles,
            Category: seed_categories,
            Tag: seed_tags,
            User: seed_users,
            Article: seed_articles,
            ArticleMedia: seed_article_media,
        }

        for model, seeder in seeds.items():
            if not model.query.first():
                seeder()
                print(f"✅ Seeded {model.__tablename__}")
            else:
                print(f"⚡ {model.__tablename__} already has data")

        db.session.commit()
    
        # --- Permissions ---
# --- Individual seed functions ---
def seed_permissions():
    perm_view = Permission(name="view_articles", description="Can view articles")
    perm_edit = Permission(name="edit_articles", description="Can edit articles")
    perm_admin = Permission(name="admin_access", description="Full admin rights")
    db.session.add_all([perm_view, perm_edit, perm_admin])
    
        # --- Roles ---
def seed_roles():
    role_admin = Role(name="Admin", description="Administrator role")
    role_editor = Role(name="Editor", description="Editor role")
    role_employee = Role(name="Employee", description="Standard employee role")
    
    role_admin.permissions = [perm_view, perm_edit, perm_admin]
    role_editor.permissions = [perm_view, perm_edit]
    role_employee.permissions = [perm_view]
    
    db.session.add_all([role_admin, role_editor, role_employee])

def seed_users():
    # --- Users ---
    user_admin = User(name="Jane Doe", email="jane.admin@company.com", password_hash="hashed_pw")
    user_editor = User(name="Mark Editor", email="mark.editor@company.com", password_hash="hashed_pw")
    user_employee = User(name="Lucy Employee", email="lucy.employee@company.com", password_hash="hashed_pw")
    
    user_admin.roles.append(role_admin)
    user_editor.roles.append(role_editor)
    user_employee.roles.append(role_employee)
    
    db.session.add_all([user_admin, user_editor, user_employee])
    
 def seed_categories():
    # --- Categories ---
    cat_sales = Category(name="Sales", description="Knowledge base for sales processes and playbooks")
    cat_hr = Category(name="HR", description="Human Resources policies and guidelines")
    cat_perf_mgmt = Category(name="Performance Management", description="Performance appraisal and KPIs", parent=cat_hr)
    cat_ict = Category(name="ICT", description="ICT support, troubleshooting, and system guides")
    
    db.session.add_all([cat_sales, cat_hr, cat_perf_mgmt, cat_ict])
    
 def seed_tags():
     # --- Tags ---
    tag_policy = Tag(name="Policy")
    tag_training = Tag(name="Training")
    tag_process = Tag(name="Process")
    tag_guideline = Tag(name="Guideline")
    tag_tool = Tag(name="Tool")
    tag_sales_ops = Tag(name="SalesOps")
    tag_hr_policy = Tag(name="HRPolicy")
    tag_ict_support = Tag(name="ICTSupport")
    tag_perf_kpi = Tag(name="PerformanceKPI")
    
    db.session.add_all([
        tag_policy, tag_training, tag_process, tag_guideline, tag_tool,
        tag_sales_ops, tag_hr_policy, tag_ict_support, tag_perf_kpi
    ])
    
        # --- Articles ---
def seed_articles():
    article1 = Article(
        title="Sales Playbook 2025",
        content="Covers client engagement strategies, lead qualification, and closing techniques.",
        author=user_editor,
        category=cat_sales,
        tags=[tag_process, tag_training, tag_sales_ops]
    )

    article2 = Article(
        title="HR Leave Policy",
        content="Outlines procedures for annual leave, sick leave, and emergency leave requests.",
        author=user_admin,
        category=cat_hr,
        tags=[tag_policy, tag_guideline, tag_hr_policy]
    )

    article3 = Article(
        title="Performance Review Guidelines",
        content="Explains the appraisal cycle, key metrics, and employee feedback process.",
        author=user_editor,
        category=cat_perf_mgmt,
        tags=[tag_policy, tag_process, tag_perf_kpi]
    )

    article4 = Article(
        title="ICT Troubleshooting Guide",
        content="Provides solutions for common IT issues including email setup and VPN access.",
        author=user_employee,
        category=cat_ict,
        tags=[tag_tool, tag_guideline, tag_ict_support]
    )

    article5 = Article(
        title="Onboarding Checklist",
        content="Step-by-step guide for new hires covering system access, HR forms, and training.",
        author=user_admin,
        category=cat_hr,
        tags=[tag_training, tag_process, tag_hr_policy]
    )

    article6 = Article(
        title="Remote Work Policy",
        content="Details expectations, communication norms, and equipment guidelines for remote employees.",
        author=user_admin,
        category=cat_hr,
        tags=[tag_policy, tag_guideline]
    )

    article7 = Article(
        title="Sales CRM Setup Guide",
        content="Walkthrough for configuring CRM tools for lead tracking and reporting.",
        author=user_editor,
        category=cat_sales,
        tags=[tag_tool, tag_sales_ops]
    )

    db.session.add_all([article1, article2, article3, article4, article5, article6, article7])
    
def seed_article_media():
    # --- Article Media ---
    media1 = ArticleMedia(article=article1, media_type="pdf",
                          url="https://company.com/media/sales_playbook.pdf",
                          metadata_json={"pages": 25})
    media2 = ArticleMedia(article=article2, media_type="image",
                          url="https://company.com/media/hr_leave_chart.png",
                          metadata_json={"width": 1024, "height": 768})
    media3 = ArticleMedia(article=article3, media_type="ppt",
                          url="https://company.com/media/performance_review.pptx",
                          metadata_json={"slides": 15})
    media4 = ArticleMedia(article=article4, media_type="video",
                          url="https://company.com/media/ict_guide.mp4",
                          metadata_json={"duration": "10m"})
    media5 = ArticleMedia(article=article5, media_type="doc",
                          url="https://company.com/media/onboarding.docx",
                          metadata_json={"words": 1200})
    media6 = ArticleMedia(article=article6, media_type="pdf",
                          url="https://company.com/media/remote_work_policy.pdf",
                          metadata_json={"pages": 12})
    media7 = ArticleMedia(article=article7, media_type="doc",
                          url="https://company.com/media/crm_setup_guide.docx",
                          metadata_json={"words": 800})
    
    db.session.add_all([media1, media2, media3, media4, media5, media6, media7])
    
        # Commit everything
        # db.session.commit()
        # print("✅ Company knowledge base seeded with 7 articles and media attachments!")
