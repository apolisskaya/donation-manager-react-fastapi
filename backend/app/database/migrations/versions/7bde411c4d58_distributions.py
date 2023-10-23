"""distributions

Revision ID: 7bde411c4d58
Revises: 13c57532018f
Create Date: 2023-10-21 16:18:53.958220

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7bde411c4d58'
down_revision = '13c57532018f'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('distributions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('resource_type', sa.Enum('MONEY', 'FOOD', 'CLOTHING', name='resourcetypeenum'), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_distributions_id'), 'distributions', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_distributions_id'), table_name='distributions')
    op.drop_table('distributions')
    # ### end Alembic commands ###