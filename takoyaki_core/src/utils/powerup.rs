use crate::{Cache, PluginConfig, PrintableGrid, State};

pub trait Powerup<T> {
    fn new() -> Self
    where
        Self: Sized;
    fn ready(&self, cache: Cache, config: PluginConfig) -> State;
    fn evolve(&self, data: T) -> PrintableGrid;
}
